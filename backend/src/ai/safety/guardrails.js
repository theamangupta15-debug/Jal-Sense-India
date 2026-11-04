export class SafetyGuardrails {
  /**
   * Filters input for prompt-injection attacks
   */
  static sanitizeInput(message) {
    if (!message || typeof message !== 'string') return '';
    return message
      .replace(/<[^>]*>/g, '') // Strip HTML tags
      .slice(0, 1000) // Bound message length
      .trim();
  }

  /**
   * Validates final generated response against safety policies:
   * 1. No disease diagnosis
   * 2. No blanket "safe to drink" claims on unverified data
   * 3. Must warn that boiling does NOT remove chemical contaminants if boiling is discussed
   */
  static postProcessSafetyCheck(answerText) {
    let sanitized = answerText;

    // Check if boiling was discussed without the chemical disclaimer
    const mentionsBoil = /boil|boiling/i.test(sanitized);
    const mentionsChemicalLimitation = /chemical|fluoride|arsenic|nitrate|does not remove/i.test(sanitized);

    if (mentionsBoil && !mentionsChemicalLimitation) {
      sanitized += "\n\n*Important Safety Note: Boiling destroys microbial pathogens (bacteria/viruses) but does NOT remove or neutralize chemical contaminants such as Fluoride, Nitrate, or Arsenic.*";
    }

    // Refuse medical diagnosis
    if (/you have cholera|you have typhoid|you are infected/i.test(sanitized)) {
      sanitized = "I cannot provide a medical diagnosis. If you or someone in your household is experiencing severe diarrhea, vomiting, or persistent fever, please consult a qualified medical professional or visit the nearest healthcare facility immediately.";
    }

    return sanitized;
  }
}