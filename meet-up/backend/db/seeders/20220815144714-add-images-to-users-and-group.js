"use strict";
const { Group, Image } = require("../models");

const images = [
  {
    // url: "tennis image",
    url: "https://media.istockphoto.com/photos/tennis-rackets-and-balls-leaned-against-the-net-picture-id1171084311?k=20&m=1171084311&s=612x612&w=0&h=5gTGOsXlkZkSggxRnxbevqt80mKf12xT6GXUC6MN_Qc=",
  },
  {
    // url: "basketball image",
    url: "https://c0.wallpaperflare.com/preview/674/720/932/lincoln-united-states-ball-court.jpg",
  },
  {
    // url: "volleyball image",
    url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dm9sbGV5YmFsbHxlbnwwfHwwfHw%3D&w=1000&q=80",
  },
  {
    // url: "dragon image",
    url: "https://assets1.ignimgs.com/2019/05/29/dndmobile-br-1559158957902_160w.jpg?width=1280",
  },
  {
    // url: "pokemon image",
    url: "https://assets.pokemon.com/assets//cms2/img/trading-card-game/_tiles/tcgo/generic/tcgo-generic-169-en.jpg",
  },
  {
    // url: "swimming image",
    url: "https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3dpbW1pbmd8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    // url: "mcdonalds image",
    url: "https://www.eatthis.com/wp-content/uploads/sites/4/2021/06/mcdonalds-2.jpg?quality=82&strip=1",
  },
  {
    // url: "jollibee image",
    url: "https://assets3.thrillist.com/v1/image/3051439/1200x630/flatten;crop_down;webp=auto;jpeg_quality=70",
  },
  {
    // url: "meditation image",
    url: "https://ychef.files.bbci.co.uk/976x549/p021xf3f.jpg",
  },
  {
    // url: "nyc image",
    url: "https://media.istockphoto.com/photos/the-empire-state-picture-id1089200736?k=20&m=1089200736&s=612x612&w=0&h=0gT-injpIgrI-CPGsgpR0kOBVDqsoXArahvsTflt_FU=",
  },
  {
    // url: "central park image",
    url: "https://media.architecturaldigest.com/photos/62670cf1a841e371198e0b28/master/pass/GettyImages-1347979016.jpg",
  },
  {
    // url: "coffee code image",
    url: "https://www.gabadigital.com/images/coding.jpg",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const groups = await Group.findAll();

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      await group.createImage({
        url: images[i].url,
        userId: group.organizerId,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    for (const { url } of images) {
      const image = await Image.findOne({ where: { url } });
      await image.destroy();
    }
  },
};
