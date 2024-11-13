import { HfInference } from '@huggingface/inference';
import path from 'path';
import { config } from 'dotenv';

const res = config({ path: path.resolve(__dirname, '../../.env') });
res.error ? console.log(res.error) : console.log('env loaded!');

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);

(async () => {
  const tg = await hf.textGeneration({
    model: 'gpt2',
    inputs: `Generate me commit message from this git diff:  
-// fix: 2
+// fix: 3
diff --git a/apps/myapp/src/main.ts b/apps/myapp/src/main.ts
index 674cefb..b0a35c8 100644
--- a/apps/myapp/src/main.ts
+++ b/apps/myapp/src/main.ts
@@ -52,4 +52,4 @@ import { workspaceRoot } from "@nx/devkit";
   }
 })();
 
-// 44
+// 45
diff --git a/package-lock.json b/package-lock.json
index 892cbc6..5152e60 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -18,6 +18,7 @@
         "express": "^4.21.0",
:`,
  });

  console.log(tg);

  //   for await (const output of hf.textGenerationStream({
  //     model: 'HuggingFaceTB/SmolLM2-1.7B-Instruct',
  //     inputs: 'repeat "one two three four"',
  //     parameters: { max_new_tokens: 250 },
  //   })) {
  //     console.log(output.token.text, output.generated_text);
  //   }
})();
