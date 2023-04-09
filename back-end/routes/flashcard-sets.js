// Router for the page that includes all flashcard sets and a search bar
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;
      const filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      res.json(filteredData);
    })
    .catch((err) => {
      const backupData = [
        {
          numCards: 71,
          title: 'Progressive fault-tolerant portal',
          description:
            'Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.'
        },
        {
          numCards: 3,
          title: 'Business-focused content-based Graphical User Interface',
          description:
            'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.'
        },
        {
          numCards: 17,
          title: 'Crash course on Agile development',
          description:
            'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.'
        }
      ];
      const filteredBackupData = backupData.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      res.json(filteredBackupData);
    });
});

router.get('/flashcard-sets', (req, res) => {
  axios
    .get(`https://my.api.mockaroo.com/sets.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;
      res.json(data);
    })
    .catch((err) =>{
      const backupData = [{
        "numCards": 71,
        "title": "Progressive fault-tolerant portal",
        "description": "Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum."
      }, {
        "numCards": 3,
        "title": "Business-focused content-based Graphical User Interface",
        "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa."
      }, {
        "numCards": 17,
        "title": "Up-sized foreground alliance",
        "description": "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis."
      }, {
        "numCards": 28,
        "title": "Distributed content-based leverage",
        "description": "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est."
      }, {
        "numCards": 75,
        "title": "Persistent client-server help-desk",
        "description": "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
      }, {
        "numCards": 94,
        "title": "Ameliorated foreground circuit",
        "description": "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."
      }, {
        "numCards": 13,
        "title": "Vision-oriented systemic artificial intelligence",
        "description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci."
      }, {
        "numCards": 96,
        "title": "Decentralized disintermediate implementation",
        "description": "Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim."
      }, {
        "numCards": 38,
        "title": "Centralized static methodology",
        "description": "In eleifend quam a odio."
      }, {
        "numCards": 44,
        "title": "Virtual upward-trending algorithm",
        "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum."
      }]
      res.json(backupData)
    }
    
    );
});

router.get('/flashcard-set/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: 'missing set id' });
  }

  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;

      const backupData = {
        id,
        title: 'Agile Quiz',
        description:
          'This set is a mock quiz set that will be used to test dynamic study set editting. The id of the set will be the id passed in via the query params',
        cards: [
          { term: 'card1', definition: 'card1 def' },
          { term: 'card2', definition: 'card2 def' },
          { term: 'card3', definition: 'card3 def' }
        ]
      };
      res.status(200).json(backupData);
    })
    .catch((err) => {
      const backupData = {
        id,
        title: 'Agile Quiz',
        description:
          'This set is a mock quiz set that will be used to test dynamic study set editting. The id of the set will be the id passed in via the query params',
        cards: [
          { term: 'card1', definition: 'card1 def' },
          { term: 'card2', definition: 'card2 def' },
          { term: 'card3', definition: 'card3 def' }
        ]
      };
      res.json(backupData)
      res.status(500).send({ message: 'api request error' });
    });
});
router.get('/flashcards', (req, res) => {
  axios
    .get(`https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0`)
    .then((apiResponse) => {
      const data = apiResponse.data;
      const filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      res.json(filteredData);
    })
    .catch((err) => res.status(500).send({ message: 'api request error' }));
});
module.exports = router;
