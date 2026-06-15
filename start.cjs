const { execSync } = require('child_process');
const os = require('os');

const nets = os.networkInterfaces();
let ip = 'localhost';
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      ip = net.address;
      break;
    }
  }
}

console.log('\n🏛️  Kelurahan Pondok Pucung - Dev Server');
console.log('─────────────────────────────────────');
console.log(`   Local:    http://localhost:3000`);
console.log(`   Network:  http://${ip}:3000`);
console.log('─────────────────────────────────────\n');

execSync('next dev --hostname 0.0.0.0', { stdio: 'inherit' });