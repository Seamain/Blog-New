/**
 * 生成文章AI摘要
 * @param content 文章内容
 * @param title 文章标题
 * @returns AI生成的摘要文本
 */
export async function generateAISummary(content: string, title: string): Promise<string> {
    if (!content || !title) {
        throw new Error('Missing content or title');
    }

    try {
        const summary = await callAIService(content, title);
        return summary;
    } catch (error) {
        console.error('AI Summary Error:', error);
        throw error;
    }
}

async function callAIService(content: string, title: string): Promise<string> {
    // 使用 DeepSeek API (兼容 OpenAI 格式)
    const apiKey = import.meta.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
        throw new Error('Missing DeepSeek API key');
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: '你是一个专业的文章总结助手，请用简洁的中文总结文章的核心内容，控制在150字以内。'
                },
                {
                    role: 'user',
                    content: `请总结以下文章，标题是"${title}"：\n\n${content.substring(0, 3000)}`
                }
            ],
            max_tokens: 300,
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
