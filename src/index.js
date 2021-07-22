/**
 * Plugin that runs before netlify build to add
 * netlify form attributes to <form>. Used to convert basic html
 * forms to let netlify handle form submissions.
 */
const fs = require('fs')

module.exports = {
    onPreBuild: ({ constants, utils }) => {
        try {
            /**
             * Show a message to the user that the plugin is starting
             */
            console.log('Starting html-form-to-netlify-form-plugin...')

            /**
             * Step 1.
             * Reference static files
             * Since this is in the pre-build stage, it may not exist yet
             */
            const SITE_DIR = constants.PUBLISH_DIR

            /**
             * Step 2.
             * Check to see if files exist in the published directory
             */

            /**
             * Step 3.
             * Look through each html file recursively - inspect for any
             * <form> tags and inject 'data-netlify="true"' to the <form> element
             */
        } catch (error) {
            // Fail the build - will show as "Failed" in the dashboard
            return utils.build.failBuild(
                'Plugin failed. Did not add form attributes.'
            )
        }
    },
}
