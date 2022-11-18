import { useContext } from "react";
import SidebarPro from "./SidebarPro";
import { ThemeContext } from "./ThemeContext";
import "./Home.css";
import { useState } from "react";
import cat from "./cat.png";
import mohamad from "./mohamad.png";
import ivy from "./Ivy.png";
import Jeremy from "./Jeremy.png";
import Ricky from "./ricky.png";
import Nevinn from "./Nevinn.png";
const Home = () => {
  const { theme } = useContext(ThemeContext);

  const [Hov1, setHov1] = useState(false);
  const [Hov2, setHov2] = useState(false);
  const [Hov3, setHov3] = useState(false);
  const [Hov4, setHov4] = useState(false);
  const [Hov5, setHov5] = useState(false);
  const [Hov6, setHov6] = useState(false);

  const handleMouseOver = (id) => {
    
    const ans= true;
    if (id == 1) {
      setHov1(ans);
    } else if (id == 2) {
      setHov2(ans);
    } else if (id == 3) {
      setHov3(ans);
    } else if (id == 4) {
      setHov4(ans);
    } else if (id == 5) {
      setHov5(ans);
    } else if (id == 6) {
      setHov6(ans);
    }
    
    
  };

  const handleMouseOut = (id) => {
    
     const ans=false;
   if (id == 1) {
     setHov1(ans);
   } else if (id == 2) {
     setHov2(ans);
   } else if (id == 3) {
     setHov3(ans);
   } else if (id == 4) {
     setHov4(ans);
   } else if (id == 5) {
     setHov5(ans);
   } else if (id == 6) {
     setHov6(ans);
   }
  };

  return (
    <div className="homeWrapper">
      <SidebarPro />
      <div className="homeContent p-3 " data-theme={theme}>
        <div class="gap"></div>
        <div class="container mt-3 ">
          <div class="row ">
            <h1 className="text-center header">
              <em>
                <strong>HOME PAGE</strong>
              </em>
            </h1>
            <dev class="gap"></dev>
            <h4 class="h1">
              <em>Eventual🗓</em>
            </h4>
            <div class="center">
              <h5>
                <strong>
                  Knowing yourself is the beginning of all wisdom Our purpose is
                  to make people feel comfortable in their skin and emplore
                  their interest in all types of field without spending a penny.
                  We know how hard it is today for us to gather around and meet
                  new people with the same hobbies, ideas, or even lifestyles.
                  When you are on Eventual, feel free to take a deep breath,
                  grab a cozy throw, a cup of hot chocolate and begin your
                  journey...
                </strong>
              </h5>
            </div>
          </div>

          <div class="row">
            <dev class="gap"></dev>
            <h4 class="h1">
              <em>Functionality⚙️</em>
            </h4>
            <h5>
              <strong>
                Eventual provides users with the ability to find free events in
                their city that they can then sign up for. Large events
                including things like community BBQs and small events like board
                game nights can be found. Events will be organized to suit user
                preferences and options like liking events, looking at a history
                of past events, and rating events will be available.
              </strong>
            </h5>
          </div>
          <div class="row">
            <dev class="gap"></dev>
            <h5 class="h1">
              What makes us so <em>✨✨special✨✨</em>
            </h5>
            <h5>
              <strong>
                Eventual only focused on free events, whereas others allows both
                free and paid events. While others allows users to filter for
                free events, the homepage doesn't allow you to turn off paid
                events, only when searching, making it impossible for a user to
                get targeted recommendations without having to check each event
                for the price. Our website intends to help users that want to
                browse every event without worrying about whether it requires a
                fee to get in. Users that are interested in more personal
                events, such as local chess games and clothing donations, rather
                than large conventions and performances that require a ticket.
                Others make a commission off ticket sales, and it is unlikely
                that they will pivot and attempt to split their audience by
                creating an separate site for just free events. Similarly for
                the homepage, Others hope to convert their free users into
                paying customers by keeping the homepage ambiguous, and
                requiring clicks to check, creating investment. Their current
                model is more profitable, making it unlikely that others would
                try to break into our niche.
              </strong>
            </h5>
          </div>

          <div class="container text-center mt-5 mb-2 ">
            <h4>
              <em>
                <del>MEET THE COOLEST PEOPLE THAT YOU'LL EVER MEET😈</del>
              </em>
            </h4>
            <h1 className="text-center size2 h1">
              <em>
                ---------------------------Meet the Eventual
                Warriors----------------------------------
              </em>
            </h1>
            <dev class="gap"></dev>
            <span class="badge-secondary size1">
              <strong>
                Eventual carries the warriors blood,tears,and DEDICATION!!! So
                We would like to introduce ourselves a little...
              </strong>
            </span>
          </div>

          <div class="row ">
            <dev class="gap"></dev>
            <div class="center">
              <div>
                <div
                  class="p-3 text-center text-primary center aboutUsCard"
                  id="1"
                  value="1"
                  onMouseOver={() => handleMouseOver(1)}
                  onMouseOut={() => handleMouseOut(1)}
                >
                  <strong class="size1">
                    <em> The Warrior of Joy</em>
                  </strong>

                  {Hov1 && (
                    <div class="col-md-4 mb-auto p-2 center">
                      <div className="p-3 text-center rounded box aboutUsText">
                        <img
                          src={cat}
                          class="img-responsive rounded-circle img-fluid"
                          alt="Responsive image"
                        ></img>
                        <h5 class="mt-3 text-dark name">
                          <strong>Anabelle Hsiao</strong>
                        </h5>
                        <span class="work d-block text-primary">
                          The Warrior of Joy
                        </span>
                        <div class="mt-4 about">
                          <dl class="row">
                            <dt class="col-sm-4">About Myself</dt>
                            <dd class="col-sm-9">
                              I enjoy walking my dog and doing cheer{" "}
                            </dd>
                            <dt class="col-sm-5">Eventual Moments</dt>
                            <dd class="col-sm-9">
                              {" "}
                              The moments I enjoy the most has to be the
                              post-demo talks. The sense of achievement is the
                              best feeling one could ever imagine. Keep up the
                              good work team!{" "}
                            </dd>
                          </dl>
                        </div>
                        <div class="mt-3"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="gap"></div>
              <div>
                <div
                  class="p-3 text-center text-success center aboutUsCard"
                  onMouseOver={() => handleMouseOver(2)}
                  onMouseOut={() => handleMouseOut(2)}
                >
                  <strong class="size1">
                    <em> The Warrior of Resilience</em>
                  </strong>

                  {Hov2 && (
                    <div class="col-md-4 mb-auto p-2 center">
                      <div className="p-3 text-center rounded box aboutUsText">
                        <img
                          src={ivy}
                          class="img-responsive rounded-circle img-fluid"
                          alt="Responsive image"
                        ></img>
                        <h5 class="mt-3 text-dark name">
                          <strong>Ivy Wills</strong>
                        </h5>
                        <span class="work d-block text-success">
                          The Warrior of Resilience
                        </span>
                        <div class="mt-4 about">
                          <dl class="row">
                            <dt class="col-sm-4">About Myself</dt>
                            <dd class="col-sm-9">
                              I enjoy learning new things and day dreaming.{" "}
                            </dd>
                            <dt class="col-sm-5">Eventual Moments</dt>
                            <dd class="col-sm-9">
                              {" "}
                              The moments I enjoy the most is making cute test
                              events. That was a fun part of this project!{" "}
                            </dd>
                          </dl>
                        </div>
                        <div class="mt-3"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="gap"></div>
              <div>
                <div
                  class="p-3 text-center text-warning center aboutUsCard"
                  onMouseOver={() => handleMouseOver(3)}
                  onMouseOut={() => handleMouseOut(3)}
                >
                  <strong class="size1">
                    <em> The Warrior of Kindness</em>
                  </strong>

                  {Hov3 && (
                    <div class="col-md-4 mb-auto p-2 center">
                      <div className="p-3 text-center rounded box aboutUsText">
                        <img
                          src={Nevinn}
                          class="img-responsive rounded-circle img-fluid"
                          alt="Responsive image"
                        ></img>
                        <h5 class="mt-3 text-dark name">
                          <strong>Nevinn Wong</strong>
                        </h5>
                        <span class="work d-block text-warning">
                          The Warrior of Kindness
                        </span>
                        <div class="mt-4 about">
                          <dl class="row">
                            <dt class="col-sm-4">About Myself</dt>
                            <dd class="col-sm-9">
                              I like Marvel movies and going random places.{" "}
                            </dd>
                            <dt class="col-sm-5">Eventual Moments</dt>
                            <dd class="col-sm-9">
                              {" "}
                              The best parts of developing Eventual was the fun
                              sprint demos and using the MERN stack for the
                              first time!{" "}
                            </dd>
                          </dl>
                        </div>
                        <div class="mt-3"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="gap"></div>
          <div class="row ">
            <div class="center">
              <div>
                <div
                  class="p-3 text-center text-secondary center aboutUsCard"
                  onMouseOver={() => handleMouseOver(4)}
                  onMouseOut={() => handleMouseOut(4)}
                >
                  <strong class="size1">
                    <em> The Warrior of Wisdom</em>
                  </strong>

                  {Hov4 && (
                    <div class="col-md-4 mb-auto p-2 center">
                      <div className="p-3 text-center rounded box aboutUsText">
                        <img
                          src={mohamad}
                          class="img-responsive rounded-circle img-fluid"
                          alt="Responsive image"
                        ></img>
                        <h5 class="mt-3 text-dark name">
                          <strong>Mohamad El Kadri</strong>
                        </h5>
                        <span class="work d-block text-secondary">
                          The Warrior of Wisdom
                        </span>
                        <div class="mt-4 about">
                          <dl class="row">
                            <dt class="col-sm-4">About Myself</dt>
                            <dd class="col-sm-9">
                              I thing to do in my leisure time is to read{" "}
                            </dd>
                            <dt class="col-sm-5">Eventual Moments</dt>
                            <dd class="col-sm-9">
                              {" "}
                              The best part was finishing the sprints and having
                              a free weekend.Getting some fresh air from nature
                              and of course,enjoy my favourite activity,reading.{" "}
                            </dd>
                          </dl>
                        </div>
                        <div class="mt-3"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="gap"></div>
              <div>
                <div
                  class="p-3 text-center text-danger center aboutUsCard"
                  onMouseOver={() => handleMouseOver(5)}
                  onMouseOut={() => handleMouseOut(5)}
                >
                  <strong class="size1">
                    <em> The Warrior of Intelligence</em>
                  </strong>

                  {Hov5 && (
                    <div class="col-md-4 mb-auto p-2 center">
                      <div className="p-3 text-center rounded box aboutUsText">
                        <img
                          src={Jeremy}
                          class="img-responsive rounded-circle img-fluid"
                          alt="Responsive image"
                        ></img>
                        <h5 class="mt-3 name text-dark">
                          <strong>Jeremy La</strong>
                        </h5>
                        <span class="work d-block text-danger">
                          The Warrior of Intelligence
                        </span>
                        <div class="mt-4 about">
                          <dl class="row">
                            <dt class="col-sm-4">About Myself</dt>
                            <dd class="col-sm-9">
                              I enjoy going for walks and drinking coffee.{" "}
                            </dd>
                            <dt class="col-sm-5">Eventual Moments</dt>
                            <dd class="col-sm-9">
                              {" "}
                              I enjoy going for walks and drinking coffee The
                              best part about developing Eventual was seeing the
                              TA flame us for our spam button{" "}
                            </dd>
                          </dl>
                        </div>
                        <div class="mt-3"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="gap"></div>
              <div>
                <div
                  class="p-3 text-center text-info center aboutUsCard"
                  onMouseOver={() => handleMouseOver(6)}
                  onMouseOut={() => handleMouseOut(6)}
                >
                  <strong class="size1">
                    <em> The Warrior of Bravery</em>
                  </strong>

                  {Hov6 && (
                    <div class="col-md-4 mb-auto p-2 center ">
                      <div className="p-3 text-center rounded box aboutUsText">
                        <img
                          src={Ricky}
                          class="img-responsive rounded-circle img-fluid"
                          alt="Responsive image"
                        ></img>
                        <h5 class="mt-3 text-dark name">
                          <strong> Ricky Su Shen</strong>
                        </h5>
                        <span class="work d-block text-info">
                          The Warrior of Bravery
                        </span>
                        <div class="mt-4 about">
                          <dl class="row">
                            <dt class="col-sm-4">About Myself</dt>
                            <dd class="col-sm-9"> I love Reading. </dd>
                            <dt class="col-sm-5">Eventual Moments</dt>
                            <dd class="col-sm-9">
                              {" "}
                              The best part was trying to fix bugs right on
                              deadline so you can feel the adrenalin rushing
                              through your veins while you try to code for the
                              deadline.{" "}
                            </dd>
                          </dl>
                        </div>
                        <div class="mt-3"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
