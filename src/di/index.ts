// Service interfaces
interface Logger {
    log(message: string): void;
  }
  
  interface EmailService {
    sendEmail(to: string, subject: string, body: string): void;
  }
  
  // Concrete service implementations
  class ConsoleLogger implements Logger {
    log(message: string): void {
      console.log(`[ConsoleLogger] ${message}`);
    }
  }
  
  class EmailServiceImpl implements EmailService {
    sendEmail(to: string, subject: string, body: string): void {
      // Implementation for sending email
      console.log(`[EmailService] Sending email to ${to}: ${subject} - ${body}`);
    }
  }
  
  // Service consumer
  class UserService {
    private logger: Logger;
    private emailService: EmailService;
  
    constructor(logger: Logger, emailService: EmailService) {
      this.logger = logger;
      this.emailService = emailService;
    }
  
    registerUser(username: string, email: string): void {
      // Register user logic
      this.logger.log(`Registering user: ${username}`);
      this.emailService.sendEmail(email, 'Welcome', 'Welcome to our application!');
    }
  }
  
/**
 * Client code.
 */
  const logger = new ConsoleLogger();
  const emailService = new EmailServiceImpl();
  const userService = new UserService(logger, emailService);
  
  userService.registerUser('john123', 'john@example.com');
  