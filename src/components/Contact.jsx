import React from "react";

function Contact() {
	return (
		<div className="contact-container">
			<h3>Vintage Wines Inc.</h3>

			<div className="location">
				<h4>Location</h4>
				<small>
					Strada Calea Victoriei nr 102-104, Turda, jud. Cluj, Romania
				</small>
				<div className="social-icons">
					<a href="https://www.facebook.com/kids.turda" target="_blank">
						<i className="fa-brands fa-facebook-square"></i>
					</a>
					<a href="https://wa.me/0745000000" target="_blank">
						<i className="fa-brands fa-whatsapp-square"></i>
					</a>
					<a href="">
						<i className="fa-solid fa-location-dot"></i>
					</a>
				</div>
			</div>

			<div className="business-hours">
				<h4>Business Hours</h4>
				<small>
					<strong>Monday-Friday:</strong> 10.00 am - 17.00 pm
				</small>
				<small>
					<strong>Saturday:</strong> 10.00 am - 14.00 pm
				</small>
				<small>
					<strong>Sunday:</strong> Closed
				</small>
			</div>

			<div className="contact-details">
				<h4>Contact</h4>
				<div className="phone">
					<i className="fa-solid fa-square-phone"></i>
					<a href="tel:0745.000.0000">0745.000.0000</a>
				</div>
				<div className="email">
					<i className="fa-solid fa-envelope"></i>
					<a href="mailto:vintagewines.yahoo.com">vintagewines.yahoo.com</a>
				</div>
			</div>
		</div>
	);
}

export default Contact;
