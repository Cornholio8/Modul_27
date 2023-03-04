const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/images/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('Hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});
  
app.get('/contact', (req, res) => {
  res.render('contact');
});
  
app.get('/info', (req, res) => {
  res.render('info');
});
  
app.get('/history', (req, res) => {
  res.render('history');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post('/contact/send-message', upload.single('image'), (req, res) => {
  const { author, sender, title, message } = req.body;

  if(author && sender && title && message && req.file) {
    res.render('contact', { isSent: true, fileName: req.file.originalname });
  }
  else {
    res.render('contact', { isError: true })
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});