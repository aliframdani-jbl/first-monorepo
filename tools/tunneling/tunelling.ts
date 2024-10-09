import ngrok from '@ngrok/ngrok' 

(async function() {
  console.log(`Ingress established at: ${(await ngrok.forward({ addr: 3000, authtoken_from_env: true})).url()}`);
  process.stdin.resume();
})();