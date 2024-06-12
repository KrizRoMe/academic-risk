# 🎓 Academic Risk

Web Application focused on reduce the rate of students at academic risk.

## 👀 Requirements

- [Nodejs v20.12.2](https://nodejs.org/en/blog/release/v20.12.2)

## 🚀 Getting Started

### Local Development Setup

1. Clone the repository.

   ```bash
   git clone https://github.com/KrizRoMe/academic-risk.git
   cd academic-risk
   ```

2. Activate pnpm using corepack:

   ```bash
   corepack enable pnpm
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Set up environment variables:

   - Copy the content of `.env.example` into `.env`.

   ```bash
   cp .env.example .env
   ```

   - Fill in the values of the environment variables.

5. Set up Database:

   - Create a database in PostgreSQL using compose.yml.

   ```bash
   docker-compose up -d
   ```

   - Run the migrations.

   ```bash
   pnpx prisma migrate dev
   ```

6. Start the development server and navigate to <http://127.0.0.1:3000/> to access the application.

   ```bash
   pnpm run dev
   ```

7. That's all you need to do.

## 🧰 Local Development

### Work flow

1. Check an assigned task in Asana.

2. Create a branch.

3. Add commits.

4. Create PR.

5. Add screenshots inside Asana task if there were UI changes.

6. Request review.

### Coding style

- Use English words in the backend and Spanish ones in the frontend user components.

- Keep in mind the following conventions for handling Git and GitHub logs:

  - For writing commits use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). For example:

    ```shell
    feat(master): remove field `uploaded_at` from `UploadHistory` model
    ```

  - For naming branches:

    - Use the pattern `<type>/<story ID>-<branch name>`. Where
      - Type: `feat|chore|fix`
      - Story ID: Task’s ID from [Asana](https://app.asana.com/0/1205919244595687/1205919526171646).
      - Branch name: Very short description in snake case.
    - Example:
      - `feat/1234567890000000-remove_field_from_uploadhistoy_model`

  - For naming pull request (PR). As example:

    - Pattern `<type>(<scope>): <message>`. Where:
      - Type: `feat|chore|fix`
      - Scope: Block or scope the changes affect the most.
      - Message: Short description.
    - Example:
      - `chore(master): create required DB tables`

  - For writing PR description.

    - Pattern:

      ```md
      From story [Story ID|Story ID URL](Story ID URL)
      ```

      Where:

      - Story ID: Task’s ID from Asana.
      - Story ID URL: Task’s URL from Asana.

    - Example:
      - `From story [1234567890000000](https://app.asana.com/0/1205919244595687/1234567890000000)`
