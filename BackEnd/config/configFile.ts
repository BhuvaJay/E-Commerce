require('dotenv').config();


// server port
function getPort() {
  return parseInt(process.env.PORT || '9000');
}

function getDbName(): string {
  return process.env.DbName || ''
}

// get environment
function getEnvironment  (): string {
  return process.env.ENVIRONMENT || 'dev';
}
function getTestMode(): boolean {
  // return !!process.env.testMode || false;
  return process.env.testMode === 'true';
}


function getDbUser() {
  return process.env.DbUser || '';
}

function getDbPwd() {
  return process.env.DbPwd || '';
}

function getDbHost() {
  return process.env.DbHost || '';
}

function getDbPort() {
  return parseInt(process.env.DbPort || '3306');
}

// get JWT_SECRET_KEY
function getJwtSecretKey (): string {
  return process.env.JWT_SECRET_KEY || '';
}

function getLogFilesPath (): string {
  return (process.env.LogFilesPath || '');
}

//get the email for logAnalysis user
function loginEmailLogAnalysis () {
  return (process.env.LogAnalysisEmail || '');
}

//get the email for logAnalysis user
function loginPassLogAnalysis () {
  return (process.env.LogAnalysisPassword || '');
}
function getEmail() {
  return ('admin12@gmail.com' || '');
}
function getPassword() {
  return ('54321' || '');
}

const config = {
  getPort,
  getJwtSecretKey,
  getEnvironment,
  getLogFilesPath,
  loginEmailLogAnalysis,
  loginPassLogAnalysis,
  getDbHost,
  getDbName,
  getDbPort,
  getDbPwd,
  getDbUser, getTestMode, getEmail,getPassword
};


export { config };
