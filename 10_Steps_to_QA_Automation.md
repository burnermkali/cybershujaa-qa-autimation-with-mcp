# 10 Steps to QA Automation

1. **Define the automation goal and risks** – Confirm the exact workflow, success criteria, and failure signals you need to cover before writing any prompt or test.
2. **Capture system context and constraints** – Gather URLs, credentials, data states, and edge conditions so the AI understands the environment it is testing.
3. **Decompose the workflow into MCP actions** – Decide which MCPs (Playwright, SuperMemory, n8n, etc.) you will chain and the order they should execute.
4. **Prepare reliable test data and fixtures** – Securely stage accounts, test inputs, and cleanup steps to keep runs deterministic.
5. **Author high-context prompts (TASK + ROLE + CONTEXT + STEPS)** – Write prompts that specify the QA persona, explicit instructions, and expected outputs for each MCP call.
6. **Show examples or templates for complex asks** – Provide few-shot test cases, bug reports, or output schemas so the AI mirrors your standards.
7. **Execute and stabilize the Playwright MCP flow** – Run the scripted tests, enforce stable selectors, and assert the key success messages for each path.
8. **Inspect results with reflection and adversarial reviews** – Ask the AI (or yourself) to critique the tests, challenge assumptions, and expose coverage gaps.
9. **Persist learnings in SuperMemory (or similar)** – Store reusable prompts, bug patterns, and test data references for future sessions.
10. **Automate follow-up actions and iterate** – Trigger n8n or other workflows for alerts, reports, and continuous improvement based on test outcomes.
