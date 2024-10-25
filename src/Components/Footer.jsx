import { useState } from "react";
import { useSubscribeNewsletterMutation } from "../redux/slice/newsletterApiSlice";
import { message } from "antd";

const Footer = () => {

  const [email, setEmail] = useState("");
  const [ subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation()

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!email) {
      message.error("Please enter a valid email.");
      return;
    }

    if (!isValidEmail(email)) {
      message.error("Please enter a valid email.");
      return;
    }

    try {
      await subscribeNewsletter({ email, is_subscribed: true, }).unwrap();
      message.success("Subscribed successfully!");
      setEmail(""); // Reset the email field after success
      // setIsChecked(false); // Reset the checkbox
    } catch (error) {
      message.error("Subscription failed. Please try again.");
    }
  };
  return (
    <footer className="bg-black text-white py-20 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 xl:gap-20">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl mb-4">Newsletter</h2>
            <p className="mb-4">Sign up to be the first to know about drops, special offers and more.</p>
            <p className="mb-4">I&apos;m interested in:</p>
            <div className="flex items-center mb-4">
              <label className="mr-4">
                <input type="radio" name="interest" className="mr-2" /> Menswear
              </label>
              <label className="mr-4">
                <input type="radio" name="interest" className="mr-2" /> Womenswear
              </label>
              <label>
                <input type="radio" name="interest" className="mr-2" /> Both
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input type="email" placeholder="Your email" className="bg-gray-800 text-white p-2 flex-grow rounded-2xl" value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <button className="bg-gray-700 p-2 ml-2 rounded-2xl" onClick={handleSubscribe}
                disabled={isLoading}>{isLoading ? 'Submitting...': "Submit"}</button>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> I agree to the Privacy Policy
            </label>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between flex-grow">
            <div className="mb-8 md:mb-0 md:mr-4">
              <h3 className="mb-4 font-semibold">Get help</h3>
              <ul>
                <li className="mb-2"><a href="#">FAQ</a></li>
                <li className="mb-2"><a href="#">Shipping</a></li>
                <li className="mb-2"><a href="#">Returns</a></li>
                <li className="mb-2"><a href="#">Payments</a></li>
                <li className="mb-2"><a href="#">Contact us</a></li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0 md:mr-4">
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul>
                <li className="mb-2"><a href="#">Terms of Service</a></li>
                <li className="mb-2"><a href="#">Privacy Policy</a></li>
                <li className="mb-2"><a href="#">Cookie Policy</a></li>
                <li className="mb-2"><a href="#">Disclaimer</a></li>
                <li className="mb-2"><a href="#">Warranty and Returns Agreement</a></li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0">
              <h3 className="mb-4 font-semibold">Social</h3>
              <ul>
                <li className="mb-2 flex items-center">
                  <a href="#">Twitter</a>
                </li>
                <li className="mb-2 flex items-center">
                  <a href="#">Facebook</a>
                </li>
                <li className="mb-2 flex items-center">
                  <a href="#">Instagram</a>
                </li>
                <li className="mb-2 flex items-center">
                  <a href="#">Tiktok</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="mt-8 text-center">
          <p className="mb-4">English</p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
