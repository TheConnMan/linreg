# LinReg

[![Docker Pulls](https://img.shields.io/docker/pulls/theconnman/linreg.svg)]()

Linear regression deviation checks

**LinReg** is a small proof of concept to see how far linear regressions with a standard deviation error lines can go for detecting anomalies.

## Running

Clone and run with the following commands:

```bash
npm install -g sails
git clone https://github.com/TheConnMan/linreg.git
cd linreg
npm install
npm start
```

Then navigate to <http://127.0.0.1:3000>.

## Running in Docker

Docker is the easiest way to run **LinReg**. Run with `docker run -d -p 3000:3000 theconnman/linreg`.
