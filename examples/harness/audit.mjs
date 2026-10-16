// Copy into your external audit harness and adapt imports/acceptance criteria.
// The default intentionally blocks; it never fabricates a successful app test.
import fs from 'node:fs';
fs.writeFileSync(process.env.ARGUS_RESULT_FILE, JSON.stringify({results:[{
  id:'login', status:'blocked',
  observed:'Application-specific login assertions have not been connected.',
  evidence:'A harness template is not execution evidence. Implement valid and invalid credential controls.'
}]}));
