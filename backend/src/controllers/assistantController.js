import { AgentOrchestrator } from '../ai/agent/orchestrator.js';
import { formatEnvelope } from '../middleware/responseEnvelope.js';

export async function handleAssistantChat(req, res, next) {
  try {
    const { message, locationId = 'LOC-MH-NAG', conversationHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Message content cannot be empty.' }
      });
    }

    const response = await AgentOrchestrator.handleUserMessage({
      message,
      locationId,
      conversationHistory
    });

    res.json(
      formatEnvelope(
        {
          answer: response.answer,
          toolsUsed: response.toolsUsed
        },
        {
          provenance: response.citations,
          coverage: { geographicScope: locationId },
          limitations: response.limitations
        }
      )
    );
  } catch (err) {
    next(err);
  }
}