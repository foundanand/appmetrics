/*******************************************************************************
 * Copyright 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
'use strict';

var app = require('./test_app');
var fs = require('fs');
var path = require('path');
var appmetrics = app.appmetrics;
var outputDir = path.join(process.cwd(), 'headlesstestoutput' + Date.now());

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Run in headless mode for 1 minute, producing output in 'outputDir'
appmetrics.configure({
  'com.ibm.diagnostics.healthcenter.headless': 'on',
  'com.ibm.diagnostics.healthcenter.headless.run.duration': '1',
  'com.ibm.diagnostics.healthcenter.headless.run.number.of.runs': '1',
  'com.ibm.diagnostics.healthcenter.headless.output.directory': outputDir,
});
app.start();

var tap = require('tap');

// skip the test if we're testing on z/OS platform
// skip the test if we're testing on z/OS platform
if (process.platform === 'os390') {
  tap.plan(0);
  cleanUp();
} else {
  tap.plan(1); // Adjust as needed

  tap.test('Headless mode should produce a .hcd file', function(t) {
    setTimeout(function() {
      fs.readdir(outputDir, function(error, files) {
        if (error) {
          t.fail('An error occurred: ' + error);
          cleanUp();
          t.end(); // Ensure this is called to signal the end of the test
          return;
        }
        const hcdFiles = files.filter(file => /(\w+)\.hcd$/.test(file));
        if (hcdFiles.length > 0) {
          hcdFiles.forEach(file => t.pass(file + ' HCD file found'));
        } else {
          t.fail('No .hcd file found');
        }
        cleanUp();
        t.end(); // Ensure this is called to signal the end of the test
      });
    }, 70000); // Ensure this aligns with your headless run duration
  }); // Corrected indentation for this line
}

function cleanUp() {
  deleteDir(outputDir);
  app.endRun();
}

function deleteDir(directory) {
  // Delete temporary directory
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach(function(file) {
      var fileName = path.join(directory, file);
      fs.unlinkSync(fileName);
    });
    fs.rmdirSync(directory);
  }
}
