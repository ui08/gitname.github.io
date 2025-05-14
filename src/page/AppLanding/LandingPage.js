import React from "react";

import "./plugins/style.css";

import {
    faBarChart,
    faBookmark,
    faPlane,
    faPlaneLock,
    faPlay,
    faPlusCircle,
    faSun,
    faThList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { GetSvglogo } from "../../assets/img/app/GetSvglogo";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";

import { getTenantThemekey } from "../../util/Authenticate/TenantMasterconfig";
import t2 from "./plugins/images/design-team-01.jpg";
import mobile from "./plugins/images/mobile.png";
import finexaLogo from "../../assets/img/finexa.png"
export default function LandingPage() {
  const navigate = useNavigate();

  const handlenavigaterm = () => {
    navigate("/login/rm");
  };
  const handlenavigate = () => {
    navigate("/login");
  };

  return (
    <>
      <div>
        <nav className="navbar main-nav navbar-expand-lg px-2 px-sm-0 py-2 py-lg-0">
          <div className="container py-3">
            <a class="navbar-brand"> <img className="img-fluid" src = {finexaLogo} /></a>

            <div className="d-flex">
              <div className="me-1">
                <ButtonComp
                  wrapperName="btn_wrapper"
                  type="button"
                  btnStyle="box"
                  btnText={"RM Login"}
                  disabled={false}
                  onClick={handlenavigaterm}
                />
              </div>
              <div className="ms-1">
                <ButtonComp
                  wrapperName="btn_wrapper"
                  type="button"
                  btnStyle="box"
                  btnText={"Login"}
                  disabled={false}
                  onClick={handlenavigate}
                />
              </div>
            </div>
          </div>
        </nav>

        <section className="section gradient-banner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 order-2 order-md-1 text-center text-md-left">
                <h1 className="text-white font-weight-bold mb-4">
                  Showcase your app with Small Apps
                </h1>
                <p className="text-white mb-5">
                  Besides its beautiful design. Laapp is an incredibly rich core
                  framework for you to showcase your App.
                </p>
              </div>
              <div className="col-md-6 text-center order-1 order-md-2">
                <img className="img-fluid" src={mobile} alt="screenshot"></img>
              </div>
            </div>
          </div>
        </section>
        {/*====  End of Hero Section  ====*/}
        <section className="section pt-0 position-relative pull-top">
          <div className="container">
            <div className="rounded shadow p-5 bg-white">
              <div className="row">
                <div className="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                  <FontAwesomeIcon icon={faPlane} className="text-primary" />
                  <h3 className="mt-4 text-capitalize h5 ">themes made easy</h3>
                  <p className="regular text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam non, recusandae tempore ipsam dignissimos molestias.
                  </p>
                </div>
                <div className="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                  <FontAwesomeIcon icon={faSun} className="text-primary" />
                  <h3 className="mt-4 text-capitalize h5 ">powerful design</h3>
                  <p className="regular text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam non, recusandae tempore ipsam dignissimos molestias.
                  </p>
                </div>
                <div className="col-lg-4 col-md-12 mt-5 mt-lg-0 text-center">
                  <FontAwesomeIcon icon={faThList} className="text-primary" />

                  <h3 className="mt-4 text-capitalize h5 ">creative content</h3>
                  <p className="regular text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam non, recusandae tempore ipsam dignissimos molestias.
                  </p>
                  <p />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="feature section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ml-auto justify-content-center">
                {/* Feature Mockup */}
                <div className="image-content">
                  <img className="img-fluid" src={mobile} alt="iphone"></img>
                </div>
              </div>
              <div className="col-lg-6 mr-auto align-self-center">
                <div className="feature-content">
                  {/* Feature Title */}
                  <h2>
                    Increase your productivity with <a>Small Apps</a>
                  </h2>
                  {/* Feature Description */}
                  <p className="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                {/* Testimonial Quote */}
                <div className="testimonial">
                  <p>
                    "InVision is a window into everything that's being designed
                    at Twitter. It gets all of our best work in one place."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="feature section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ml-auto align-self-center">
                <div className="feature-content">
                  {/* Feature Title */}
                  <h2>
                    Increase your productivity with <a>Small Apps</a>
                  </h2>
                  {/* Feature Description */}
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                {/* Testimonial Quote */}
                <div className="testimonial">
                  <p>
                    "InVision is a window into everything that's being designed
                    at Twitter. It gets all of our best work in one place."
                  </p>
                  <ul className="list-inline meta">
                    <li className="list-inline-item">
                      <img className="img-fluid" src={t2} alt="iphone"></img>
                    </li>
                    <li className="list-inline-item">Jonathon Andrew</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 mr-auto justify-content-center">
                {/* Feature mockup */}
                <div className="image-content">
                  <img className="img-fluid" src={mobile} alt="iphone"></img>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====  End of Feature Grid  ====*/}
        {/*==============================
=            Services            =
===============================*/}
        <section className="service section bg-gray">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <h2>An Interface For Lifestyle</h2>
                  <p>
                    <a>Small Apps</a> makes it easy to stay on top of your Life
                    Style. No late tasks. No gimmicks.
                  </p>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-lg-6 align-self-center">
                {/* Feature Image */}
                <div className="service-thumb left">
                  <img className="img-fluid" src={mobile} alt="iphone"></img>
                </div>
              </div>
              <div className="col-lg-5 mr-auto align-self-center">
                <div className="service-box">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-xs-12">
                      {/* Service 01 */}
                      <div className="service-item">
                        {/* Icon */}

                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="text-primary"
                        />

                        {/* Heading */}
                        <h3>Easy Prototyping</h3>
                        {/* Description */}
                        <p>
                          Curabitur arcu erat, accumsan id imperdiet et,
                          porttitor at sem. Curabitur aliquet quam id dui
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      {/* Service 01 */}
                      <div className="service-item">
                        {/* Icon */}

                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          className="text-primary"
                        />

                        {/* Heading */}
                        <h3>Sensor Bridge</h3>
                        {/* Description */}
                        <p>
                          Curabitur arcu erat, accumsan id imperdiet et,
                          porttitor at sem. Curabitur aliquet quam id dui
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      {/* Service 01 */}
                      <div className="service-item">
                        {/* Icon */}

                        <FontAwesomeIcon
                          icon={faBarChart}
                          className="text-primary"
                        />

                        {/* Heading */}
                        <h3>Strategist</h3>
                        {/* Description */}
                        <p>
                          Curabitur arcu erat, accumsan id imperdiet et,
                          porttitor at sem. Curabitur aliquet quam id dui
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      {/* Service 01 */}
                      <div className="service-item">
                        {/* Icon */}
                        {/* <i className="ti-panel" /> */}
                        <FontAwesomeIcon
                          icon={faPlaneLock}
                          className="text-primary"
                        />

                        {/* Heading */}
                        <h3>Art Direction</h3>
                        {/* Description */}
                        <p>
                          Curabitur arcu erat, accumsan id imperdiet et,
                          porttitor at sem. Curabitur aliquet quam id dui
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====  End of Services  ====*/}
        {/*=================================
=            Video Promo            =
==================================*/}
        <section className="video-promo section bg-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="content-block">
                  {/* Heading */}
                  <h2>Watch Our Promo Video</h2>
                  {/* Promotional Speech */}
                  <p>
                    Vivamus suscipit tortor eget felis porttitor volutpat.
                    Curabitur arcu erat, accumsan id imperdiet et, porttitor at
                    sem. Vivamus{" "}
                  </p>
                  {/* Popup Video */}
                  <a>
                    <FontAwesomeIcon icon={faPlay} className="text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====  End of Video Promo  ====*/}
      </div>
    </>
  );
}
