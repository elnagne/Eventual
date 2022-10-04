import React from "react";
import Sidebar from "./Sidebar";
import EventsDisplay from "./EventsDisplay";

const MOCK_EVENTS = [
  {
    event_name: "Tennis Doubles",
    image_url:
      "https://tenniscreative.com/wp-content/uploads/2020/09/doubles-tennis-beginners-1024x620.jpg",
    author: "Nick Cheng",
    startTime: "2023-04-08T19:00:00.000Z",
    endTime: "2023-04-08T22:00:00.000Z",
    description:
      "Come and play tennis with me! I am new to the neighbourhood and I played tennis every week in my old neighbourhood!\n Racquets will be provided by the court\n made a deal with the court owner to give everyone that comes a free racquet. You get to keep it too.",
    num_likes: 16,
    city: "Toronto",
    category: "Sports",
    address: "C-01 Software Eng St.",
  },
  {
    event_name: "Library Catan!!",
    image_url:
      "https://cdn.shopify.com/s/files/1/0481/9075/0883/products/dye_catan_150407_0564_1200x1200.jpg?v=1604069403",
    author: "Michael Realman",
    startTime: "2023-02-17T17:00:00.000Z",
    endTime: "2023-02-17T19:00:00.000Z",
    description:
      "Play catan in the library with me and my uni friends! Come learn a new game!",
    num_likes: 27,
    city: "Richmond Hill",
    category: "Board Games",
    address: "123 Address St.",
  },
  {
    event_name: "MCU movies binge",
    image_url:
      "https://pursuenews.com/wp-content/uploads/2018/04/Still-of-Thanos-from-Avengers-Infinity-War.jpg",
    author: "Anna Bretcher",
    startTime: "2023-01-28T13:00:00.000Z",
    endTime: "2023-01-28T15:00:00.000Z",
    description:
      "I rented out a personal theatre, come binge all the Marvel movies with me!.",
    num_likes: 31,
    city: "Mississauga",
    category: "Sports",
    address: "C-01 Software Eng St.",
  },

  {
    event_name: "Tennis Doubles",
    image_url:
      "https://tenniscreative.com/wp-content/uploads/2020/09/doubles-tennis-beginners-1024x620.jpg",
    author: "Nick Cheng",
    startTime: "2023-04-08T19:00:00.000Z",
    endTime: "2023-04-08T22:00:00.000Z",
    description:
      "Come and play tennis with me! I am new to the neighbourhood and I played tennis every week in my old neighbourhood!\n Racquets will be provided by the court\n made a deal with the court owner to give everyone that comes a free racquet. You get to keep it too.",
    num_likes: 16,
    city: "Toronto",
    category: "Sports",
    address: "C-01 Software Eng St.",
  },
  {
    event_name: "Library Catan!!",
    image_url:
      "https://cdn.shopify.com/s/files/1/0481/9075/0883/products/dye_catan_150407_0564_1200x1200.jpg?v=1604069403",
    author: "Michael Realman",
    startTime: "2023-02-17T17:00:00.000Z",
    endTime: "2023-02-17T19:00:00.000Z",
    description:
      "Play catan in the library with me and my uni friends! Come learn a new game!",
    num_likes: 27,
    city: "Richmond Hill",
    category: "Board Games",
    address: "123 Address St.",
  },
  {
    event_name: "MCU movies binge",
    image_url:
      "https://pursuenews.com/wp-content/uploads/2018/04/Still-of-Thanos-from-Avengers-Infinity-War.jpg",
    author: "Anna Bretcher",
    startTime: "2023-01-28T13:00:00.000Z",
    endTime: "2023-01-28T15:00:00.000Z",
    description:
      "I rented out a personal theatre, come binge all the Marvel movies with me!.",
    num_likes: 31,
    city: "Mississauga",
    category: "Sports",
    address: "C-01 Software Eng St.",
  },
  {
    event_name: "Tennis Doubles",
    image_url:
      "https://tenniscreative.com/wp-content/uploads/2020/09/doubles-tennis-beginners-1024x620.jpg",
    author: "Nick Cheng",
    startTime: "2023-04-08T19:00:00.000Z",
    endTime: "2023-04-08T22:00:00.000Z",
    description:
      "Come and play tennis with me! I am new to the neighbourhood and I played tennis every week in my old neighbourhood!\n Racquets will be provided by the court\n made a deal with the court owner to give everyone that comes a free racquet. You get to keep it too.",
    num_likes: 16,
    city: "Toronto",
    category: "Sports",
    address: "C-01 Software Eng St.",
  },
  {
    event_name: "Library Catan!!",
    image_url:
      "https://cdn.shopify.com/s/files/1/0481/9075/0883/products/dye_catan_150407_0564_1200x1200.jpg?v=1604069403",
    author: "Michael Realman",
    startTime: "2023-02-17T17:00:00.000Z",
    endTime: "2023-02-17T19:00:00.000Z",
    description:
      "Play catan in the library with me and my uni friends! Come learn a new game!",
    num_likes: 27,
    city: "Richmond Hill",
    category: "Board Games",
    address: "123 Address St.",
  },
  {
    event_name: "MCU movies binge",
    image_url:
      "https://pursuenews.com/wp-content/uploads/2018/04/Still-of-Thanos-from-Avengers-Infinity-War.jpg",
    author: "Anna Bretcher",
    startTime: "2023-01-28T13:00:00.000Z",
    endTime: "2023-01-28T15:00:00.000Z",
    description:
      "I rented out a personal theatre, come binge all the Marvel movies with me!.",
    num_likes: 31,
    city: "Mississauga",
    category: "Sports",
    address: "C-01 Software Eng St.",
  },
];

const Events = () => {
  return (
    <div className="eventsWrapper">
      <Sidebar />
      <div className="eventContent">
        <EventsDisplay events={MOCK_EVENTS} />
      </div>
    </div>
  );
};

export default Events;
