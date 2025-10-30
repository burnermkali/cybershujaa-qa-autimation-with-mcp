# 🚀 Lesson 2: MCP QA Automation Workshop

## 👋 Welcome
*Facilitator: Thomas Adika*  
*Duration: 60 minutes*

```
┌───────────────────────────────────────────────┐
│                                               │
│  1. Welcome & Recap (5 min)                   │
│     • Quick check-in                          │
│     • Address blockers                        │
│                                               │
│  2. Live Demo (10 min)                        │
│     • Playwright product search               │
│     • Real-time test execution                │
│                                               │
│  3. Prompting Basics (10 min)                 │
│     • Effective test case creation            │
│                                               │
│  4. Hands-on Session (20 min)                 │
│     • Complete the tasks                      │
│                                               │
│  5. Wrap-up (5 min)                           │
│     • Share results                           │
│     • Homework assignment                     │
│                                               │
└───────────────────────────────────────────────┘
```

## 🎯 Today's Objectives

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. [✓] Run Playwright MCP browser test                    │
│     • Search products on Amazon/Jumia                      │
│     • Assert search results                                │
│                                                             │
│  2. [ ] Summarize QA YouTube video                         │
│     • Extract 3 test ideas                                 │
│                                                             │
│  3. [ ] SuperMemory Exercise                               │
│     • Save a bug pattern                                   │
│     • Retrieve and verify                                  │
│                                                             │
│  4. [★] Bonus: n8n Notifications                           │
│     • Set up failure alerts                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🛠 Step-by-Step Guide

### 1. Playwright MCP Demo

**Choose one platform:**

```
┌───────────────────────┐      ┌───────────────────────┐
│                       │      │                       │
│   Amazon Test         │      │   Jumia Test         │
│   • Search: Headphones│      │   • Search: Laptop   │
│   • Assert: 5+ items  │      │   • Log: Top 3 items │
│                       │      │                       │
└───────────┬───────────┘      └───────────┬───────────┘
            │                               │
            ▼                               ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Test Flow:                                        │
│  1. Open URL                                       │
│  2. Accept region (if shown)                       │
│  3. Search for product                             │
│  4. Wait for results                               │
│  5. Verify/Extract data                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Example Prompt:**
```
"Use Playwright MCP to:
1. Open https://www.amazon.com
2. Accept region modal if shown
3. Search for 'wireless headphones'
4. Wait for results
5. Assert: 5+ product tiles visible
6. Assert: Page contains 'results' text
7. Return runnable TypeScript test"
```

### 2. YouTube QA Summary

```
┌───────────────────────────────────────────────┐
│  [YouTube Video URL]                          │
│  ▼                                           │
│  ┌────────────────────────────────────────┐  │
│  │ 1. Extract Key Points                 │  │
│  │ 2. Identify 3 Test Cases              │  │
│  │ 3. Add Assertions                     │  │
│  └────────────────────────────────────────┘  │
│  ▼                                           │
│  ┌────────────────────────────────────────┐  │
│  │ Test Case 1: [Title]                   │  │
│  │ • Steps                               │  │
│  │ • Expected Result                     │  │
│  │ • Assertions                          │  │
│  └────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

### 3. SuperMemory Exercise

```
┌───────────────────────────────────────────────┐
│  Store:                                      │
│  ┌────────────────────────────────────────┐  │
│  │ Key: login-bug-pattern-001            │  │
│  │                                       │  │
│  │ Issue: Trailing spaces in username    │  │
│  │                                       │  │
│  │ Fixes:                                │  │
│  │ • Trim client-side input              │  │
│  │ • Normalize server-side               │  │
│  │ • Add 2 edge-case tests               │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  Retrieve:                                   │
│  ┌────────────────────────────────────────┐  │
│  │ Search: login-bug-pattern-001         │  │
│  │                                       │  │
│  │ Suggested Tests:                      │  │
│  │ 1. Test with leading/trailing spaces  │  │
│  │ 2. Test with multiple spaces between  │  │
│  └────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

### 4. n8n Notification (Optional)

```
┌─────────────┐    ┌─────────────┐    ┌─────────────────┐
│             │    │             │    │                 │
│  Test Run   │───▶│   n8n       │───▶│  #qa-alerts    │
│  Fails      │    │  Workflow   │    │  Channel        │
│             │    │             │    │                 │
└─────────────┘    └─────────────┘    └─────────────────┘
```

## 📋 Deliverables Checklist

```
┌─────────────────────────────────────────────────────┐
│ ✓ Playwright Test                                  │
│   - [ ] Code                                       │
│   - [ ] Output/Screenshot                         │
│                                                   │
│ ✓ YouTube Summary                                 │
│   - [ ] 3 Test Cases                              │
│   - [ ] Assertions                                │
│                                                   │
│ ✓ SuperMemory                                     │
│   - [ ] Stored Entry                              │
│   - [ ] Retrieved Content                         │
│                                                   │
│ ★ n8n (Optional)                                 │
│   - [ ] Workflow JSON                             │
│   - [ ] Test Payload                              │
│                                                   │
│ ✓ Reflection                                      │
│   • What worked well?                             │
│   • What was challenging?                         │
│   • Next automation target?                       │
│                                                   │
└─────────────────────────────────────────────────────┘
```

## 💡 Prompting Best Practices

```
┌─────────────────────────────────────────────────────┐
│ 1. Be Specific                                     │
│    • Role: QA Engineer                            │
│    • Goal: Clear objective                        │
│    • Input: URLs, Credentials, Selectors          │
│    • Output Format: TypeScript/JavaScript         │
│                                                   │
│ 2. Structure                                      │
│    • Use numbered steps                           │
│    • Include acceptance criteria                  │
│    • Specify wait conditions                      │
│                                                   │
│ 3. Iterate Effectively                           │
│    • Ask for specific fixes                       │
│    • Reference previous outputs                   │
│    • Provide error messages                      │
│                                                   │
│ 4. Template                                       │
│    "Act as a QA engineer. Goal: [what].           │
│     Input: [url/creds/selectors].                 │
│     Constraints: [timeouts/conditions].           │
│     Output: [format with assertions]."            │
└─────────────────────────────────────────────────────┘
```

(cid:127)
(cid:127)
(cid:127)
(cid:127)
(cid:127)
