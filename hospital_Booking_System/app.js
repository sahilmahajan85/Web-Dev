const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./models/user.js');
const Doctor = require('./models/doctor.js');
const Patient = require('./models/patient.js');
//const expressLayouts = require('express-ejs-layouts');
const Appointment = require('./models/appointment');
const app = express();
const session = require('express-session');

const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hospitalSystem', {
 //  useNewUrlParser: true,
 // useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
// app.use(expressLayouts);
// app.set('layout', './layouts/boilerplate');


app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

// GET Routes for forms
app.get('/', (req, res) => res.render('home.ejs'));
app.get('/register', (req, res) => res.render('register.ejs'));

app.get('/login', (req, res) => res.render('login.ejs'));
app.get('/DoctorRegister', (req, res) => res.render('DocReg.ejs'));
app.get('/AllDoctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId'); // Get all registered doctors
    res.render('allDoctors', { doctors }); // Render EJS and send doctors
  } catch (err) {
    res.status(500).send('Server error');
  }
});
// POST Register
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send('Email already registered');

    const user = new User({ name, email, password, role });
    await user.save();

    if (role === 'doctor') {
      const doctor = new Doctor({ userId: user._id });
      await doctor.save();
    } else if (role === 'patient') {
      const patient = new Patient({ userId: user._id });
      await patient.save();
    }

    res.send('Registration successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("Invalid login");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid login");

  req.session.userId = user._id; // ✅ Set patient ID in session
  console.log("✅ User logged in:", user._id);

  if (user.role === 'doctor') {
     const appointments = await Appointment.find({ doctorId: user._id })
    .populate('patientId', 'name');
    return res.render('doctorLogin', { name: user.name, appointments });
  } else {
    const doctors = await User.find({ role: 'doctor' });
    return res.render('patientlogin', { name: user.name, doctors });
  }
});


app.post('/book-appointment', async (req, res) => {
   console.log('🔍 BOOKING ROUTE SESSION:', req.session);
  const { doctorId, date, time } = req.body;

  if (!req.session.userId) {
    return res.send("User not logged in"); // ❌ This is your current error
  }

  try {
    const appointment = new Appointment({
      doctorId,
      patientId: req.session.userId,
      date,
      time
    });

    await appointment.save();
    res.send('Appointment booked successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to book appointment');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout Error:", err);
      return res.send("Error logging out.");
    }
    res.redirect('/login'); // Change path to your login route
  });
});



// Start server
app.listen(8080, () => {
  console.log(`Server running at http://localhost:${8080}`);
});
