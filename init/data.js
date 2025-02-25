//database initialization data
const sampleListings = [        //sample data for listings
  {
    title: "Cozy Beachfront Cottage",           //title of listing
    description:                                //description of listing
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {                                    //image of listing
      filename: "listingimage",                   //filename of image
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740225980/comfykeys_DEV/m2ho5csg9fxurutizwri.jpg",      //url of image
    },
    price: 1500,                                //price of listing
    location: "Malibu",                         // location of listing
    categories: ['Popular', 'Pools', 'Rooms', 'Beach', 'City', 'Boating'],    //categories of listing
    country: "United States",                     //country of listing
    geometry: { type: 'Point', coordinates: [-118.7798, 34.0259] }      //coordinates of listing  
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226009/comfykeys_DEV/gc1kna1pxesv0ybq8bp3.jpg",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    categories: ['Pools', 'Rooms', 'Boating', 'Play'],
    geometry: { type: 'Point', coordinates: [-74.0060, 40.7128] }
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226034/comfykeys_DEV/ml8urkelhdciyzrsefgw.jpg",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    categories: ['Pools', 'Rooms', 'Hills', 'Camping'],
    geometry: { type: 'Point', coordinates: [-106.8370, 39.1911] }
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226062/comfykeys_DEV/gof6djnrs5kltx3inm1o.jpg",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    categories: ['Pools', 'Rooms', 'Beach', 'City'],
    geometry: { type: 'Point', coordinates: [11.2558, 43.7696] }
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226244/comfykeys_DEV/f3x6uqvqwvh0f01zlsrx.jpg",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    categories: ['Popular', 'Pools',  'Camping', 'Farm'],
    geometry: { type: 'Point', coordinates: [-122.6765, 45.5231] }
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226288/comfykeys_DEV/rttnljzjaldokawuqovq.jpg",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    categories: [ 'Pools', 'Rooms', 'Beach', 'Play'],
    geometry: { type: 'Point', coordinates: [-86.8515, 21.1619] }
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226361/comfykeys_DEV/kbyza7vvbqvt9phbrcjq.jpg",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    categories: ['Rooms',  'Hills', 'Camping','Boating'],
    geometry: { type: 'Point', coordinates: [-120.0324, 39.0968] }
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226383/comfykeys_DEV/mqqxi0uxexonulxda3ny.jpg",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    categories: ['Popular', 'Pools', 'Rooms', 'City',  'Luxury',],
    geometry: { type: 'Point', coordinates: [-118.2437, 34.0522] }
  },
  {
    title: "Beach view villa",
    description:
      "Hit the Beach right from your doorstep from this goan villa",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226407/comfykeys_DEV/xuknrx65rh8prhcvuj6i.jpg",
    },
    price: 3000,
    location: "Goa",
    country: "India",
    categories: [ 'Pools', 'Rooms', 'Beach', 'City'],
    geometry: { type: 'Point', coordinates: [7.2266, 46.0965] }
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226453/comfykeys_DEV/aov4os6uu05udjx1hrge.jpg",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    categories: ['Popular', 'Hills', 'Camping', 'Snow', 'Luxury'],
    geometry: { type: 'Point', coordinates: [34.6857, -2.3333] }
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226471/comfykeys_DEV/xuhm87if3lgugi2hwdqf.jpg",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    categories: ['Camping', 'Farm',  'Play'],
    geometry: { type: 'Point', coordinates: [4.9041, 52.3676] }
  },
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226487/comfykeys_DEV/wheuu14txtrql4ibon8x.jpg",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    categories: ['Rooms', 'Luxury', 'Boating'],
    geometry: { type: 'Point', coordinates: [178.0650, -17.7134] }
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226522/comfykeys_DEV/jjj9p9x20x4falrc0gky.jpg",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    categories: ['Rooms', 'Beach', 'City', 'Play' ],
    geometry: { type: 'Point', coordinates: [-1.7201, 51.8330] }
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226544/comfykeys_DEV/uixtcnxmey33php1yxr9.jpg",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
    categories: ['Popular', 'Pools', 'Rooms', 'City', 'Boating'],
    geometry: { type: 'Point', coordinates: [-71.0589, 42.3601] }
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226570/comfykeys_DEV/skrhnu8qvoncp3r1b56l.jpg",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    categories: ['Popular', 'Rooms', 'Beach'],
    geometry: { type: 'Point', coordinates: [115.1889, -8.4095] }
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226605/comfykeys_DEV/g9vuywu3icdrghpfpcu1.jpg",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
    categories: ['Hills', 'Camping', 'Farm'],
    geometry: { type: 'Point', coordinates: [-115.5708, 51.1784] }
  },
  {
    title: "Art Deco Apartment in Miami",
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226629/comfykeys_DEV/ntuhllxhyris9gjndujr.jpg",
    },
    price: 1600,
    location: "Miami",
    country: "United States",
    categories: ['Popular', 'Rooms', 'City', 'Snow', 'Skiing'],
    geometry: { type: 'Point', coordinates: [-80.1918, 25.7617] }
  },
  {
    title: "Tropical Villa in Phuket",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226667/comfykeys_DEV/vyynxqx1xgmp5r4vgmrn.jpg",
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    categories: ['Pools', 'Rooms', 'Beach','Boating', 'Play'],
    geometry: { type: 'Point', coordinates: [98.3981, 7.8804] }
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226697/comfykeys_DEV/sm1jyo865v4mng88l7ms.jpg",
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    categories: ['Beach', 'Luxury', 'Boating'],
    geometry: { type: 'Point', coordinates: [-4.2026, 57.4778] }
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226725/comfykeys_DEV/pdjzvskqfzrjznbb9wix.jpg",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    categories: ['Popular', 'Pools', 'Rooms', 'Beach', 'City',  'Monuments', 'Luxury', 'Boating','Play'],
    geometry: { type: 'Point', coordinates: [55.2708, 25.2048] }
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226772/comfykeys_DEV/km9x4cg4akuifglyzrku.jpg",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
    categories: ['Rooms', 'Hills', 'Camping', 'Farm'],
    geometry: { type: 'Point', coordinates: [-110.3626, 46.8797] }
  },
  {
    title: "Beachfront Villa in Greece",
    description: "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226884/comfykeys_DEV/b292iujhlhja3ih5vc2x.jpg"
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    categories: ['Popular', 'Pools', 'Rooms', 'Beach', 'City','Boating'],
    geometry: {
      type: "Point",
      coordinates: [25.358710, 37.446708]
    }
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description: "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226955/comfykeys_DEV/jhmd9imnq9lv2cbkdwzr.jpg"
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    categories: ['Rooms', 'City', 'Hills', 'Camping', 'Play'],
    geometry: {
      type: "Point",
      coordinates: [-84.090725, 9.934739]
    }
  },
  {
    title: "Historic Cottage in Charleston",
    description: "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740226991/comfykeys_DEV/wlo1hbhtoxhbc0j03gpc.jpg"
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
    categories: [ 'Rooms',  'Hills', 'Camping',  'Farm'],
    geometry: {
      type: "Point",
      coordinates: [-79.931051, 32.776474]
    }
  },
  {
    title: "Modern Apartment in Tokyo",
    description: "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740227037/comfykeys_DEV/rjzc6zduwhpkiwpmyuqr.jpg"
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    categories: ['Popular', 'Pools', 'Rooms',  'City', 'Hills',  'Monuments', 'Play'],
    geometry: {
      type: "Point",
      coordinates: [139.691706, 35.689487]
    }
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description: "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740227062/comfykeys_DEV/lnlswsrvjaplherxgmjc.jpg"
    },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    categories: ['Rooms',  'City', 'Hills', 'Camping', 'Boating',  'Play' ],
    geometry: {
      type: "Point",
      coordinates: [-71.572395, 43.193852]
    }
  },
  {
    title: "Luxury Villa in the Maldives",
    description: "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740227087/comfykeys_DEV/wvwedbi65rgdjretade0.jpg"
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    categories: ['Popular', 'Pools', 'Rooms', 'Beach', 'Luxury',  'Boating',  'Play'],
    geometry: {
      type: "Point",
      coordinates: [73.220680, 3.202778]
    }
  },
  {
    title: "Ski Chalet in Aspen",
    description: "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740227107/comfykeys_DEV/dv4iyvvqaxc8bysvldui.jpg"
    },
    price: 4000,
    location: "Aspen",
    country: "United States",
    categories: ['Popular', 'Rooms',  'Hills', 'Camping', 'Snow',  'Luxury','Boating', 'Skiing'],
    geometry: {
      type: "Point",
      coordinates: [-106.818542, 39.191098]
    }
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description: "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image: {
      filename: "listingimage",
      url: "https://res.cloudinary.com/dhhtnrtmx/image/upload/v1740227133/comfykeys_DEV/ooxxkshxv1quyldepvkz.jpg"
    },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    categories: [ 'Rooms', 'Beach', 'City','Boating', 'Play'],
    geometry: {
      type: "Point",
      coordinates: [-85.329523, 9.748917]
    }
  },
];

module.exports = { data: sampleListings };    //exporting sample data for listings