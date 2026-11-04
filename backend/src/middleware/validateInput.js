export function validateLocationId(req, res, next) {
  const { id } = req.params;
  // Format check: LOC-MH-NAG[-TAL-XXX / -CITY]
  const validPattern = /^LOC-[A-Z]{2}-[A-Z0-9_-]{3,20}$/;
  if (!id || !validPattern.test(id)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_LOCATION_IDENTIFIER',
        message: 'The requested location ID format is malformed or invalid.'
      }
    });
  }
  next();
}

export function validateChatMessage(req, res, next) {
  const { message } = req.body || {};
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'EMPTY_MESSAGE',
        message: 'A non-empty text message string is required.'
      }
    });
  }

  if (message.length > 1000) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MESSAGE_TOO_LONG',
        message: 'Message exceeds the maximum permitted safety threshold of 1000 characters.'
      }
    });
  }

  next();
}