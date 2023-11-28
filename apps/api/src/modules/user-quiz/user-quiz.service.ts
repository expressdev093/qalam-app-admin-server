import { Injectable } from '@nestjs/common';
import { CreateUserQuizDto } from './dto/create-user-quiz.dto';
import { UpdateUserQuizDto } from './dto/update-user-quiz.dto';
import { BaseService } from 'src/common';
import { UserQuiz } from './entities/user-quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserQuizService extends BaseService<
  UserQuiz,
  CreateUserQuizDto,
  UpdateUserQuizDto
> {
  constructor(
    @InjectRepository(UserQuiz)
    private readonly userQuizRepository: Repository<UserQuiz>,
  ) {
    super(userQuizRepository);
  }

  async quizAnalysis(userId: number) {
    const query = `SELECT
    COUNT(uqa.is_correct) score,
    ANY_VALUE(DATE_FORMAT(uq.created_at, '%e-%b')) AS label
FROM
    user_quizzes uq
JOIN
    user_quiz_answers uqa ON uqa.user_quiz_id = uq.id
WHERE
    uq.user_id = ? AND uqa.is_correct = 1  AND YEAR(uq.created_at) = YEAR(CURDATE())
GROUP BY
  DATE(uq.created_at)
ORDER BY label ASC
LIMIT 15`;

    const result = this.userQuizRepository.query(query, [userId]);

    return result ?? [];
  }
}
