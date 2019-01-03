const MongoClient = require('mongodb').MongoClient;
const $ne = MongoClient.$ne;
const $exists = MongoClient.$exists;
const $set = MongoClient.$set;
const $or = MongoClient.$or;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const sha256 = require('js-sha256');


console.log("TEST ");

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tokoidea';

const en = 'en';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

class Db {
    setup(client) {
        this.client = client;
        this.users = this.client.collection('users');
        this.ideas = this.client.collection('ideas');
        this.users.remove({})
        this.ideas.remove({})
        this.addMockUsers();
        this.addMockIdeas();
    }

    addMockUsers() {
        this.users.insertMany([
            {
                login: 'helmi',
                hash: sha256('helmi'),
                localization: en,
                fullname: 'Helmi Helmi',
                token: 'a'
            },
            {
                login: 'umam',
                hash: sha256('umam'),
                localization: en,
                fullname: 'Umam Maulana',
                token: 'a'
            },
            {
                login: 'test',
                hash: sha256('ala'),
                localization: en,
                fullname: 'Test Account',
                token: 'a'
            },
            {
                login: 'asu',
                hash: sha256('asu'),
                localization: en,
                fullname: 'Test Account',
                token: 'a'
            },
        ], function(err, result) {
            assert.equal(err, null);
            console.log("Added users");
        });
    }

    addMockIdeas() {
        this.ideas.insertMany([
            {
                title: 'Menanam gandum',
                description: loremIpsum,
                image: 'https://picsum.photos/300',
                localization: en,
                user: 'test',
                swipes: {},
                messages: []
            },
            {
                title: 'Bagi-bagi kuda untuk Nakama',
                description: loremIpsum,
                image: 'https://picsum.photos/320',
                localization: en,
                user: 'test',
                swipes: {
                    'helmi': 'right'
                },
                messages: []
            },
            {
                title: 'Minta Ganti Laptop',
                description: loremIpsum,
                image: 'https://picsum.photos/302',
                localization: en,
                user: 'test',
                swipes: {
                    'umam': 'right',
                    'test': 'right',
                    'helmi': 'right'
                },
                messages: []
            },
            {
                title: 'Pengadaan jam tidur siang',
                description: loremIpsum,
                image: 'https://picsum.photos/309',
                localization: en,
                user: 'test',
                swipes: {},
                messages: []
            },
            {
                title: 'Kerja sambil nge vodka',
                description: loremIpsum,
                image: 'https://picsum.photos/306',
                localization: en,
                user: 'test',
                swipes: {},
                messages: []
            }
        ], function(err, result) {
            assert.equal(err, null);
            console.log("Added users");
        })
    }

    createToken(username, hash) {
        console.log(username, hash)
        const token = sha256('' + Math.random());

        return this.users.find({
            login: username,
            hash: hash.toLowerCase()
        }).toArray()
        .then(r => {
            console.log(r[0].hash)
            if( r.length > 0 ) {
                this.users.update({
                    login: username
                }, {
                    $set: {token: token}
                })
            } else {
                throw new Error('Invalid user credentials');
            }
        })
        .then(_ => token);
    }

    validAccess(username, token) {
        return this.users.find({
            login: username,
            token: token
        }).toArray();
    }

    addIdea(user, title, description, image, localization) {
        return this.ideas.insertOne({
            title: title,
            description: description,
            image: image,
            localization: localization,
            user: user,
            swipes: {},
            messages: []
        });
    }

    addMessage(ideaId, user, message) {
        const messageBody = {
            date: + new Date(),
            sender: user,
            content: message
        }

        return this.ideas.update({
            _id: new ObjectId(ideaId),
        }, {
            $push: {'messages': messageBody}
        });
    }

    getMessages(ideaId) {
        return this.ideas.find({
            _id: new ObjectId(ideaId)
        }).toArray()
        .then(ideas => {
           if( ideas.length > 0 ) {
               return ideas[0].messages;
           } else {
               return [];
           }
        });
    }

    addSwipe(ideaId, user, direction) {
        const updateKey = 'swipes.' + user;

        return this.ideas.update({
            _id: new ObjectId(ideaId),
        }, {
            $set: {[updateKey]: direction}
        });
    }

    getUserIdeas(login) {
        return this.ideas.find({
            user: login,
        }).toArray();
    }

    getIdeasForUser(login) {
        const userSwipes = 'swipes.' + login;

        return this.ideas.find({
            user: {$ne: login},
            [userSwipes]: {$exists: false}
        }).toArray();
    }

    getUserMatches(login) {
        const userSwipes = 'swipes.' + login;
        return this.ideas.find({
            [userSwipes]: 'right'
        }).toArray();
    }

}

const dbClient = new Db();

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  dbClient.setup(db);
//   client.close();
});

module.exports = dbClient;



