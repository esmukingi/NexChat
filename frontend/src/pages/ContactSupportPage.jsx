import { useState } from "react";
import { Mail, PhoneCall, MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useContactStore from "../store/useContactStore";

const ContactSupportPage = () => {
  const { formData, setFormData, formStatus, submitForm } = useContactStore(); 
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitForm(); 
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-20 pb-12 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-base-content tracking-tight">
          Contact Our Support Team
        </h1>
        <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
          We're here to assist you with any questions or concerns. Reach out through your preferred method.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Support Specialist Card */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-xl opacity-75"></div>
            <div className="relative bg-base-100 shadow-2xl rounded-3xl p-8 space-y-6">
              <div className="text-center">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src="/me.png"
                  alt="Alain Beni Ngoboka"
                  className="w-32 h-32 rounded-full mx-auto border-4 border-primary shadow-lg object-cover"
                />
                <h2 className="text-2xl font-bold mt-4 text-base-content">
                  NGOBOKA Alain Beni
                </h2>
                <p className="text-sm text-base-content/60">
                  Support Specialist · Fullstack Developer & BIT Analyst
                </p>
              </div>

              {/* Support Options */}
              <div className="space-y-4">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-base-200 shadow-sm border border-base-300"
                >
                  <Mail className="text-primary w-6 h-6" />
                  <div>
                    <p className="font-semibold text-base-content">Email Support</p>
                    <a
                      href="http://mailto:google@gmail.com"
                      className="text-sm text-primary hover:underline"
                    >
                      ngobokaben@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-base-200 shadow-sm border border-base-300"
                >
                  <PhoneCall className="text-primary w-6 h-6" />
                  <div>
                    <p className="font-semibold text-base-content">Phone Support</p>
                    <p className="text-sm text-base-content/70">+250 787 979 333</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-base-200 shadow-sm border border-base-300"
                >
                  <MessageCircle className="text-primary w-6 h-6" />
                  <div>
                    <p className="font-semibold text-base-content">Facebook Messenger</p>
                    <a
                      href="https://www.facebook.com/ngobokaben"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      ngobokaben
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-base-100 shadow-2xl rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 text-base-content">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-base-content/80">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full h-10 mt-1 bg-base-200 text-base-content focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/80">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full h-10 mt-1 bg-base-200 text-base-content focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/80">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="textarea textarea-bordered w-full mt-1 bg-base-200 text-base-content focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
            <AnimatePresence>
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-success text-center"
                >
                  Message sent successfully!
                </motion.div>
              )}
              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-error text-center"
                >
                  Oops! Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSupportPage;