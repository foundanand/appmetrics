/*******************************************************************************
 * Copyright 2015 IBM Corp.
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

function showLegalWarning() {
  console.log(new Date().toUTCString());
  console.log('********************************************************************************');
  console.log('You are installing the Node Application Metrics monitoring and profiling module.');
  console.log('Licensed under the Apache License, Version 2.0 (the "License")');
  console.log('you may not use this file except in compliance with the License.');
  console.log('You may obtain a copy of the License at');
  console.log('');
  console.log('http://www.apache.org/licenses/LICENSE-2.0');
  console.log('');
  console.log('Unless required by applicable law or agreed to in writing, software');
  console.log('distributed under the License is distributed on an "AS IS" BASIS,');
  console.log('WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.');
  console.log('See the License for the specific language governing permissions and');
  console.log('limitations under the License.');
  console.log('********************************************************************************');
}

function showBuildWarning() {
  console.log('\n');
  console.log('********************************************************************************');
  // eslint-disable-next-line max-len
  console.log(
    'Appmetrics uses node-gyp to compile and build local binary libraries to enhance execution performance.'
  );
  console.log('********************************************************************************');
  console.log('\n');
}

showLegalWarning();
showBuildWarning();
