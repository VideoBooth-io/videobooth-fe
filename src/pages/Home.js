import React, { useEffect } from "react";
import { Typography, Button, Popover, Card } from "antd";
import Alpaca from '../imgs/alpaca-logo-no-text.png';
import { useHistory, Link } from "react-router-dom";

const { Title } = Typography;


const Home = () => {
	let history = useHistory();

	return (
		<header className="home">
			<div className="home-nav">
			<div className="home-logo">
				<img src={Alpaca} />
				<span>VideoBooth.io</span>
			</div>
			<Link to="/login">Login</Link>
			</div>
			<div className="cover">
				<div className="home-text">
					<h1>Practice answering interview questions</h1>
					<h2>Get feedback from your peers</h2>
				</div>
			</div>
			{/* <div className="header">
				<div className="logo">
					<img alt="Alpaca Vids Logo" className="alpaca-logo" src={Alpaca}></img>
				</div>
				<div className="text">
					<h1>Success<br />Begins Here.</h1>
					<h2>Hone your presence,<br />land your dream job.</h2>
					<div className="start">
						{/* <Button>Get Started</Button> */}
						{/* <Button size="large"
							// icon="caret-right"
							className="adding-button"
							onClick={
								(e) => {
									e.preventDefault();
									history.push("/register");
								}
							}>
							B E G I N
						</Button>
					</div>
				</div>

			</div> */} 
			{/* <div className="bar">
				<div className="title">
					<h1 className="userDashHeaderFont" >VideoBooth.io</h1>
				</div>
				<div className="links">
					<a href="https://github.com/Lambda-School-Labs/video-journal-for-teams-fe">github</a>
				</div>
			</div> */}
		</header>
	)
}

export default Home; 