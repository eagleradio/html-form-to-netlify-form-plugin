const glob = require('glob')
const fs = require('fs')
const { JSDOM } = require('jsdom')

// Returns array of html files
// Eg => ['static_test/index.html','static_test/subfolder/test.html']
var get_html_files = function (src) {
    return glob.sync(src + '/**/*.html')
    // glob(src + '/**/*.html', callback)
}

// var files = get_html_files('static_test', function (err, res) {
//     if (err) {
//         console.log('Glob Error', err)
//     } else {
//         return res.map(function (html_file) {
//             console.log(`File: ${html_file}`)
//             fs.readFile(html_file, 'utf8', function (err, data) {
//                 if (err) {
//                     return console.log('File Read Error', err)
//                 } else {
//                     // readFile returns a Buffer object, which we can then convert to string
//                     //console.log(data.toString())
//                     return data.toString()
//                 }
//             })
//         })
//     }
// })

// returns array of files with html content
get_html_files('static_test').forEach((html_file) => {
    console.log('Reading files...')
    fs.readFile(html_file, 'utf8', (err, data) => {
        console.log('File read...')
        if (err) {
            throw Error('File Read Error', err)
        } else {
            // readFile returns a Buffer object, which we can then convert to string
            //return data.toString()
            const string_content = data.toString()

            const dom = new JSDOM(string_content)
            const document = dom.window.document

            const [...forms] = document.getElementsByTagName('form')

            forms.forEach((form, index) => {
                console.log('Updating dom...')
                form.setAttribute('name', `${document.title} ${index + 1}`)
                form.setAttribute('data-netlify', 'true')
            })

            if (forms.length > 0) {
                fs.writeFile(html_file, dom.serialize(), (err) => {
                    if (err) {
                        throw Error('Error writing file...')
                    } else {
                        console.log('Updated file...')
                    }
                })
            }
        }
    })
})

// go through each html file and check for form tag

// html_files.forEach((file) => {
//     const dom = new JSDOM(file)
//     const document = dom.window.document

//     const [...forms] = document.getElementsByTagName('form')

//     forms.forEach((form, index) => {
//         form.setAttribute('name', `${document.title} ${index + 1}`)
//         form.setAttribute('data-netlify', 'true')
//     })

//     return dom.serialize()
// })

// console.log(html_files_with_forms)
