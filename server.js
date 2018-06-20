require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
const Tree = require("./models/Tree");
const Favorites = require("./models/Favorites");
const User = require("./models/User");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const isomorphicFetch = require("isomorphic-fetch");
const methodOverride = require("method-override");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const requireLogin = (request, response, next) => {
  if (!request.session.authenticated) {
    response.redirect("/login");
    return;
  }
  next();
};

app.use("/client", express.static("./client/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    store: new FileStore(),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);
app.use("/", express.static("client"));
app.use(methodOverride("_method"));

// app.post("/trees"(request, response) => {
//   const treeData = request.body;
//   response.render("index");
// });

app.get("/", (request, response) => {
  response.render("login");
});

// Login the user if their username and password are correct.
app.post("/login", urlencodedParser, (request, response) => {
  let formUsername = request.body.username;
  let formPassword = request.body.password;
  User.findUsername(formUsername).then(existingUser => {
    let usernameFound = formUsername === existingUser.user_name;
    let passwordFound = formPassword === existingUser.password;
    if (usernameFound && passwordFound) {
      // Set the session data.
      request.session.authenticated = true;
      request.session.userId = existingUser.id;
      response.redirect("/home");
      return;
    } else {
      response.render("/login");
    }
  });
});

//render newUser form
app.get("/newUser", (request, response) => {
  response.render("newUser");
});

app.post("/newUser", urlencodedParser, (request, response) => {
  let username = request.body.username;
  let hashedPassword = request.body.password;
  User.createNewUser(username, hashedPassword).then(response.redirect("/"));
});

//render zipcode form
app.get("/home", requireLogin, (request, response) => {
  response.render("index");
});

app.post("/browse-trees", urlencodedParser, (request, response) => {
  const zipcode = request.body.zipcode;
  response.redirect(`/tree-map/${zipcode}`);
});

//get mapped trees by zipcode
app.get("/tree-map/:zipcode", requireLogin, (request, response) => {
  // returnZipcode(zipcode).then(zipcode => {
  response.render("resultsMap");
  // });
});

app.post("/trees/favorites", urlencodedParser, (request, response) => {
  //get user id from session
  const userId = request.session.userId;
  // console.log(userId);
  //get tree id from http body
  const treeid = request.body.treeApiId;
  Favorites.findFavoriteByUserIdAndTreeId(userId, treeid).then(existingTree => {
    if (existingTree.length > 0) {
      let message = "Sorry, you can't favorite the same tree twice!";
      response.send(message);
    } else {
      Favorites.createFavorite(request.session.userId, treeid).then(() => {
        response.redirect("/favorites");
      });
    }
    //insert into join table with these two arguements
    //render favorites page of the user
  });
});

app.get("/favorites", requireLogin, (request, response) => {
  const userId = request.session.userId;
  Favorites.findAll(userId).then(trees => {
    const fetch = require("isomorphic-fetch");

    const fetchJSON = url => {
      return fetch(url).then(response => response.json());
    };

    const fetchTreeData = treeId => {
      return fetchJSON(
        `https://data.cityofnewyork.us/resource/nwxe-4ae8.json?tree_id=${treeId}`
      ).then(treesArray => {
        return treesArray[0];
      });
    };

    const promises = trees.map(treeFavorite =>
      fetchTreeData(treeFavorite.treeid)
    );

    Promise.all(promises).then(responses => {
      response.render("favorites", { trees: responses });
    });
  });
});

// edit favorite trees by Id
app.get("/favorites/:id/edit", requireLogin, (request, response) => {
  const userId = request.session.userId;
  const treeId = request.params.id;
  Favorites.findFavoriteByUserIdAndTreeId(userId, treeId)
    .then(tree => {
      response.render("edit", { tree: tree[0] });
    })
    .catch(error => {
      response.send(error);
    });
});

app.post("/favorites/:id/edit", urlencodedParser, (request, response) => {
  const editNoteData = request.body.notes;
  const treeId = request.params.id;
  console.log(editNoteData);
  console.log(treeId);
  Favorites.edit(editNoteData, treeId).then(
    response.redirect(`/favorites/${treeId}/edit`)
  );
});

// delete task by id
app.delete("/favorites/:id", (request, response) => {
  const id = request.params.id;
  Favorites.delete(id)
    .then(tree => {
      response.redirect("/favorites");
    })
    .catch(error => {
      response.send(error);
    });
});
// Start our server
app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT} baby!`);
});
