import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { motion } from "framer-motion"

const FooterNewsletter = ({
  subscribeEmail,
  setSubscribeEmail,
  subscribeLoading,
  subscribeError,
  showSuccessMessage,
  handleSubscribe
}) => (
  <div className="bg-gradient-to-r from-green-600 to-green-700 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-green-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest shipping updates, industry insights, and exclusive offers.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={subscribeEmail}
            onChange={(e) => setSubscribeEmail(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-green-100 focus:bg-white/20"
            required
          />
          <Button
            type="submit"
            disabled={subscribeLoading}
            className="bg-white text-green-700 hover:bg-green-50 transition-colors duration-300 disabled:opacity-50"
          >
            {subscribeLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin"></div>
                Subscribing...
              </div>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>
        </form>
        {subscribeError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-300 mt-3"
          >
            {subscribeError}
          </motion.p>
        )}
        {showSuccessMessage && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-green-300 mt-3"
          >
            Subscription successful! Welcome to our newsletter.
          </motion.p>
        )}
      </div>
    </div>
  </div>
)

export default FooterNewsletter 