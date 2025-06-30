import { pgTable, serial, text, timestamp, integer, real, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').notNull(), // 'student' or 'instructor'
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const courses = pgTable('courses', {
	id: serial('id').primaryKey(),
	instructorId: integer('instructor_id').references(() => users.id).notNull(),
	title: text('title').notNull(),
	description: text('description'),
	price: real('price').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const modules = pgTable('modules', {
	id: serial('id').primaryKey(),
	courseId: integer('course_id').references(() => courses.id).notNull(),
	title: text('title').notNull(),
	order: integer('order').notNull()
});

export const lessons = pgTable('lessons', {
	id: serial('id').primaryKey(),
	moduleId: integer('module_id').references(() => modules.id).notNull(),
	title: text('title').notNull(),
	contentType: text('content_type').notNull(), // e.g., 'video', 'text', 'code'
	contentUrl: text('content_url'),
	content: text('content'),
	duration: integer('duration'), // in minutes
	order: integer('order').notNull()
});

export const liveSessions = pgTable('live_sessions', {
	id: serial('id').primaryKey(),
	courseId: integer('course_id').references(() => courses.id).notNull(),
	instructorId: integer('instructor_id').references(() => users.id).notNull(),
	title: text('title').notNull(),
	scheduledAt: timestamp('scheduled_at').notNull(),
	duration: integer('duration'), // in minutes
	meetingLink: text('meeting_link'),
	roomId: text('room_id')
});

export const enrollments = pgTable('enrollments', {
	id: serial('id').primaryKey(),
	studentId: integer('student_id').references(() => users.id).notNull(),
	courseId: integer('course_id').references(() => courses.id).notNull(),
	enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
	completedAt: timestamp('completed_at'),
	progress: real('progress').default(0).notNull()
});

export const payments = pgTable('payments', {
	id: serial('id').primaryKey(),
	enrollmentId: integer('enrollment_id').references(() => enrollments.id).notNull(),
	amount: real('amount').notNull(),
	currency: text('currency').notNull(),
	status: text('status').notNull(), // e.g., 'pending', 'completed', 'failed'
	transactionId: text('transaction_id').unique(),
	paidAt: timestamp('paid_at').defaultNow().notNull()
});

export const completedLessons = pgTable('completed_lessons', {
	id: serial('id').primaryKey(),
	studentId: integer('student_id').references(() => users.id).notNull(),
	lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
	completedAt: timestamp('completed_at').defaultNow().notNull()
});
