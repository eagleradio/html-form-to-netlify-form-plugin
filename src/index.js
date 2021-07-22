/**
 * Plugin that runs before netlify build to add
 * netlify form attributes to <form>. Used to convert basic html
 * forms to let netlify handle form submissions.
 */

module.exports = {
    onPreBuild: ({ constants, utils }) => {
        try {
            // Reference static files
            const static_files = constants.PUBLISH_DIR
            console.log('Running html-form-to-netlify-form-plugin...')
        } catch (error) {
            // Fail the build - will show as "Failed" in the dashboard
            return utils.build.failBuild(
                'Plugin failed. Did not add form attributes.'
            )
        }
    },
}
