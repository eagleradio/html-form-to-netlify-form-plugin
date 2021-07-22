const glob = require('glob')
const fs = require('fs')

// Returns array of html files
// Eg => ['static_test/index.html','static_test/subfolder/test.html']
var get_html_files = function (src, callback) {
    glob(src + '/**/*.html', callback)
}

get_html_files('static_test', function (err, res) {
    if (err) {
        console.log('Glob Error', err)
    } else {
        res.forEach(function (html_file) {
            console.log(`File: ${html_file}`)
            fs.readFile(html_file, 'utf8', function (err, data) {
                if (err) {
                    return console.log('File Read Error', err)
                } else {
                    // readFile returns a Buffer object, which we can then convert to string
                    console.log(data.toString())
                }
            })
        })
    }
})
