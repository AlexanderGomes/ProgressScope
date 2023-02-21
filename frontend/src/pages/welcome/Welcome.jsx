import React from "react";
import "./Welcome.css";
import { images } from "../../constants";

const welcome = () => {
  return (
    <div className="wel__main">
      <div className="wel__info">
        <div className="wel__textBlock">
          <h1 className="textBlock__h1">
            Transform Your Performance Review Process by focusing on your team
          </h1>
          <p className="textBlock__p">
            Give your team, daily, weekly, or monthly reviews, a team that knows
            what they are doing wrong can fix it faster.
          </p>
          <button className="callToAction">Start Now</button>
        </div>
        <div className="wel__image">
          <img className="wel__heroImage" src={images.hero} alt="" />
        </div>
      </div>
    </div>
  );
};

export default welcome;
