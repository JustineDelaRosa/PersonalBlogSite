const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const _ = require('lodash');
const port = 3000 || process.env.PORT;

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(
  'mongodb+srv://admin-justine:test123@cluster0.eosghyn.mongodb.net/blogDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// mongodb://localhost:27017/blog
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

const day1 = new Post({
  title: 'Day 1',
  content: 'Today I started my blog',
});
const day2 = new Post({
  title: 'Day 2',
  content: 'Day 2 content',
});
const day3 = new Post({
  title: 'Day 3',
  content: 'Day 3 content',
});

const defaultPosts = [day1, day2, day3];

// This is the home route. It finds all posts in the database and renders them to the home page.
app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/home', { posts });
    }
  });
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/contact', (req, res) => {
  res.render('pages/contact');
});

// write your comment here
app.get('/compose', (req, res) => {
  res.render('pages/compose');
});

// This code is used to save a new post in the database.
// title and content are from the body of the post request
// newPost is the newly created post object that is saved in the database
app.post('/compose', async (req, res) => {
  const title = req.body.title.trim();
  const content = req.body.content.trim();
  const newPost = new Post({
    title,
    content,
  });
  await newPost.save();
  res.redirect('/');
});

// Find post by id, then render the post's title and content
app.get('/posts/:id', (req, res) => {
  const requestedPostId = req.params.id;

  Post.findOne({ _id: requestedPostId }, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/posts', {
        _id: post._id,
        title: post.title,
        content: post.content,
      });
    }
  });
});

// delete a post by id
app.post('/delete', (req, res) => {
  const id = req.body.id;
  Post.findByIdAndRemove(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('success');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
