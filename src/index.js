/**
 * Plugin that runs before netlify build to add
 * netlify form attributes to <form>. Used to convert basic html
 * forms to let netlify handle form submissions.
 * https://docs.netlify.com/configure-builds/build-plugins/create-plugins
 */
const glob = require('glob')
const fs = require('fs')

module.exports = {
    onBuild: ({ constants, utils }) => {
        try {
            /**
             * Show a message to the user that the plugin is starting
             */
            console.log('Starting html-form-to-netlify-form-plugin...')

            /**
             * Step 1.
             * Reference built html pages
             */
            const SITE_DIR = constants.PUBLISH_DIR

            /**
             * Returns path and file name like below
             * ['static_build/index.html','static_build/subfolder/test.html']
             */
            var get_html_files = function (src) {
                return glob.sync(src + '/**/*.html')
            }

            /**
             * Get HTML files and content
             */
            var files = get_html_files(SITE_DIR, function (err, res) {
                if (err) {
                    throw Error('Glob Error', err)
                } else {
                    res.forEach(function (html_file) {
                        console.log(`File: ${html_file}`)
                        fs.readFile(html_file, 'utf8', function (err, data) {
                            if (err) {
                                throw Error('File Read Error', err)
                            } else {
                                // readFile returns a Buffer object, which we can then convert to string
                                return data.toString()
                            }
                        })
                    })
                }
            })

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
