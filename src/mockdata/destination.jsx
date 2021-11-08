const image1 = require('../../src/mockdata/mockImages/templeofTheTooth.jpg');
const image2 = require('../../src/mockdata/mockImages/ruwanwelisaya.jpg');
const image3 = require('../../src/mockdata/mockImages/nallur.jpg');
const image4 = require('../../src/mockdata/mockImages/church.jpg');

const destinationData = [
    {
      title: 'Temple of the tooth',
      
      description:
        "Temple of the tooth is a Buddhist temple in Kandy, Sri Lanka. It is located in the royal palace complex of the former Kingdom of Kandy, which houses the relic of the tooth of the Buddha. Since ancient times, the relic has played an important role in local politics because it is believed that whoever holds the relic holds the governance of the country. The relic was historically held by Sinhalese kings. ",
      image: `${image1.default}`,
      imageText: 'Continue reading ',
      imageLink: "https://en.wikipedia.org/wiki/Sinharaja_Forest_Reserves",
      rating:4,
      geometry:[6.3828,80.6020]
    },
    {
      title: 'Ruwanweli Maha Saya',      
      description:
        "The Ruwanweli Maha Seya, also known as the Mahathupa (the Great Thupa) is a stupa (a hemispherical structure containing relics) in Anuradhapura, Sri Lanka.[1] Two quarts or one Drona of the Buddha's relics are enshrined in the stupa, making it the largest collection of his relics anywhere.[2] It was built by Sinhalese King Dutugemunu in c. 140 B.C., who became king of Sri Lanka after a war in which the Chola King Elāra (Ellalan) was defeated. ",
      image: `${image2.default}`,
      imageText: 'Continue reading',
      imageLink: "https://en.wikipedia.org/wiki/Sinharaja_Forest_Reserves",
      rating:3
    },
    {
        title: 'Nallur Kandaswamy Temple Kovil',      
        description:
          "Nallur Kovil  is a significant Hindu temple, located in Nallur, Northern Province, Sri Lanka.[2] The presiding deity is Lord Murugan in the form of the holy 'Vel' in the Sanctum, the primary shrine, and in other forms, namely, Shanmugar, Muthukumaraswami, Valli Kaanthar with consorts Valli and Deivayanai, and Thandayuthapani, sans consorts in secondary shrines in the temple.",
        image: `${image3.default}`,
        imageText: 'Continue reading',
        imageLink: "https://en.wikipedia.org/wiki/Sinharaja_Forest_Reserves",
        rating:3
      },
      {
        title: "S.T. Mary's Church",      
        description:
          "Shrine of Our Lady of Matara is a Roman Catholic church devoted to the Virgin Mary, in the town of Matara, Sri Lanka. The shrine houses a statue of the Virgin Mary holding the infant Jesus. Though the statue's origins are unknown, church officials claim that it is 400 years old.[1] The statue has been damaged, lost and recovered more than once, most recently during the 2004 tsunami in Asia, which damaged the shrine and killed 24 people attending Sunday Mass.[2] The church celebrated its centenary year in 2007.",
        image: `${image4.default}`,
        imageText: 'Continue reading',
        imageLink: "https://en.wikipedia.org/wiki/Sinharaja_Forest_Reserves",
        rating:2
      },
  ];
  export default destinationData;