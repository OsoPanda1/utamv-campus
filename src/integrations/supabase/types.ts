export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      answers: {
        Row: {
          created_at: string | null
          id: string
          is_correct: boolean | null
          question_id: string
          text: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id: string
          text: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          code: string
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          tier: string
          tokens_reward: number
        }
        Insert: {
          code: string
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          tier?: string
          tokens_reward?: number
        }
        Update: {
          code?: string
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          tier?: string
          tokens_reward?: number
        }
        Relationships: []
      }
      certificates: {
        Row: {
          blockchain_hash: string | null
          certificate_number: string
          course_id: string
          final_score: number | null
          generated_at: string | null
          hours_completed: number | null
          id: string
          issued_at: string | null
          user_id: string
        }
        Insert: {
          blockchain_hash?: string | null
          certificate_number: string
          course_id: string
          final_score?: number | null
          generated_at?: string | null
          hours_completed?: number | null
          id?: string
          issued_at?: string | null
          user_id: string
        }
        Update: {
          blockchain_hash?: string | null
          certificate_number?: string
          course_id?: string
          final_score?: number | null
          generated_at?: string | null
          hours_completed?: number | null
          id?: string
          issued_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_deleted: boolean | null
          is_flagged: boolean | null
          message: string | null
          room: string | null
          room_id: string | null
          user_id: string
          user_name: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_deleted?: boolean | null
          is_flagged?: boolean | null
          message?: string | null
          room?: string | null
          room_id?: string | null
          user_id: string
          user_name?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_deleted?: boolean | null
          is_flagged?: boolean | null
          message?: string | null
          room?: string | null
          room_id?: string | null
          user_id?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          academic_publication_notes: string | null
          academic_publication_status: string
          academic_published_at: string | null
          category: string | null
          created_at: string | null
          description: string | null
          figshare_article_id: string | null
          figshare_doi: string | null
          hours: number | null
          id: string
          instructor_bio: string | null
          instructor_name: string | null
          is_active: boolean | null
          is_featured: boolean | null
          learning_outcomes: string[] | null
          level: string | null
          openaire_badge_url: string | null
          openaire_project_id: string | null
          prerequisites: string[] | null
          price_cents: number | null
          price_mxn: number | null
          price_usd: number | null
          slug: string | null
          stripe_price_id: string | null
          subtitle: string | null
          thumbnail_url: string | null
          title: string
          total_lessons: number | null
          zenodo_concept_doi: string | null
          zenodo_doi: string | null
          zenodo_record_id: string | null
        }
        Insert: {
          academic_publication_notes?: string | null
          academic_publication_status?: string
          academic_published_at?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          figshare_article_id?: string | null
          figshare_doi?: string | null
          hours?: number | null
          id?: string
          instructor_bio?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          learning_outcomes?: string[] | null
          level?: string | null
          openaire_badge_url?: string | null
          openaire_project_id?: string | null
          prerequisites?: string[] | null
          price_cents?: number | null
          price_mxn?: number | null
          price_usd?: number | null
          slug?: string | null
          stripe_price_id?: string | null
          subtitle?: string | null
          thumbnail_url?: string | null
          title: string
          total_lessons?: number | null
          zenodo_concept_doi?: string | null
          zenodo_doi?: string | null
          zenodo_record_id?: string | null
        }
        Update: {
          academic_publication_notes?: string | null
          academic_publication_status?: string
          academic_published_at?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          figshare_article_id?: string | null
          figshare_doi?: string | null
          hours?: number | null
          id?: string
          instructor_bio?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          learning_outcomes?: string[] | null
          level?: string | null
          openaire_badge_url?: string | null
          openaire_project_id?: string | null
          prerequisites?: string[] | null
          price_cents?: number | null
          price_mxn?: number | null
          price_usd?: number | null
          slug?: string | null
          stripe_price_id?: string | null
          subtitle?: string | null
          thumbnail_url?: string | null
          title?: string
          total_lessons?: number | null
          zenodo_concept_doi?: string | null
          zenodo_doi?: string | null
          zenodo_record_id?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          amount_paid_mxn: number | null
          completed_at: string | null
          course_id: string
          enrolled_at: string
          id: string
          status: string
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount_paid_mxn?: number | null
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          id?: string
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount_paid_mxn?: number | null
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          id?: string
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      institutional_scholarly_config: {
        Row: {
          created_at: string
          figshare_group_id: string | null
          id: string
          institution_name: string
          institution_slug: string
          isni_id: string | null
          openaire_project_id: string | null
          orcid_org_id: string | null
          repository_policy_url: string | null
          updated_at: string
          updated_by: string | null
          zenodo_community: string | null
        }
        Insert: {
          created_at?: string
          figshare_group_id?: string | null
          id?: string
          institution_name?: string
          institution_slug?: string
          isni_id?: string | null
          openaire_project_id?: string | null
          orcid_org_id?: string | null
          repository_policy_url?: string | null
          updated_at?: string
          updated_by?: string | null
          zenodo_community?: string | null
        }
        Update: {
          created_at?: string
          figshare_group_id?: string | null
          id?: string
          institution_name?: string
          institution_slug?: string
          isni_id?: string | null
          openaire_project_id?: string | null
          orcid_org_id?: string | null
          repository_policy_url?: string | null
          updated_at?: string
          updated_by?: string | null
          zenodo_community?: string | null
        }
        Relationships: []
      }
      lesson_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          is_pinned: boolean
          lesson_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_pinned?: boolean
          lesson_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_pinned?: boolean
          lesson_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_comments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lesson_comments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string | null
          id: string
          last_position_seconds: number | null
          lesson_id: string
          progress_percent: number | null
          started_at: string | null
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          id?: string
          last_position_seconds?: number | null
          lesson_id: string
          progress_percent?: number | null
          started_at?: string | null
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          id?: string
          last_position_seconds?: number | null
          lesson_id?: string
          progress_percent?: number | null
          started_at?: string | null
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          audio_content: string | null
          audio_url: string | null
          content: string | null
          course_id: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          is_free_preview: boolean | null
          module_id: string
          order_index: number
          title: string
          transcript: string | null
          type: string | null
          video_url: string | null
        }
        Insert: {
          audio_content?: string | null
          audio_url?: string | null
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          module_id: string
          order_index: number
          title: string
          transcript?: string | null
          type?: string | null
          video_url?: string | null
        }
        Update: {
          audio_content?: string | null
          audio_url?: string | null
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          module_id?: string
          order_index?: number
          title?: string
          transcript?: string | null
          type?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["module_id"]
          },
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      module_progress: {
        Row: {
          completed_at: string | null
          id: string
          module_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          module_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          module_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["module_id"]
          },
          {
            foreignKeyName: "module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          content: string | null
          course_id: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          order_index: number
          title: string
        }
        Insert: {
          content?: string | null
          course_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          order_index: number
          title: string
        }
        Update: {
          content?: string | null
          course_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_cents: number
          course_id: string
          created_at: string | null
          currency: string | null
          id: string
          status: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          course_id: string
          created_at?: string | null
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          course_id?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "payments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_stripe_events: {
        Row: {
          event_id: string
          event_type: string
          payload: Json | null
          processed_at: string
        }
        Insert: {
          event_id: string
          event_type: string
          payload?: Json | null
          processed_at?: string
        }
        Update: {
          event_id?: string
          event_type?: string
          payload?: Json | null
          processed_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_daily_quota_used: number
          ai_quota_reset_at: string
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          full_name: string | null
          id: string
          is_paid: boolean | null
          isni_id: string | null
          level: number
          linkedin_url: string | null
          orcid_access_granted_at: string | null
          orcid_connected: boolean
          orcid_id: string | null
          phone: string | null
          profession: string | null
          role: string | null
          stripe_customer_id: string | null
          tokens: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_daily_quota_used?: number
          ai_quota_reset_at?: string
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_paid?: boolean | null
          isni_id?: string | null
          level?: number
          linkedin_url?: string | null
          orcid_access_granted_at?: string | null
          orcid_connected?: boolean
          orcid_id?: string | null
          phone?: string | null
          profession?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          tokens?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_daily_quota_used?: number
          ai_quota_reset_at?: string
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_paid?: boolean | null
          isni_id?: string | null
          level?: number
          linkedin_url?: string | null
          orcid_access_granted_at?: string | null
          orcid_connected?: boolean
          orcid_id?: string | null
          phone?: string | null
          profession?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          tokens?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string | null
          id: string
          order_index: number
          quiz_id: string
          text: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_index: number
          quiz_id: string
          text: string
        }
        Update: {
          created_at?: string | null
          id?: string
          order_index?: number
          quiz_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          id: string
          passed: boolean | null
          quiz_id: string
          score: number
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          passed?: boolean | null
          quiz_id: string
          score: number
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          passed?: boolean | null
          quiz_id?: string
          score?: number
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_scores: {
        Row: {
          created_at: string | null
          id: string
          module_id: string | null
          passed: boolean | null
          quiz_id: string | null
          score: number
          time_taken_seconds: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          module_id?: string | null
          passed?: boolean | null
          quiz_id?: string | null
          score: number
          time_taken_seconds?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          module_id?: string | null
          passed?: boolean | null
          quiz_id?: string | null
          score?: number
          time_taken_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_scores_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["module_id"]
          },
          {
            foreignKeyName: "quiz_scores_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_scores_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_scores_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          is_final_exam: boolean | null
          module_id: string | null
          passing_score: number | null
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_final_exam?: boolean | null
          module_id?: string | null
          passing_score?: number | null
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_final_exam?: boolean | null
          module_id?: string | null
          passing_score?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["module_id"]
          },
          {
            foreignKeyName: "quizzes_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          count: number
          endpoint: string
          id: number
          user_id: string
          window_start: string
        }
        Insert: {
          count?: number
          endpoint: string
          id?: number
          user_id: string
          window_start: string
        }
        Update: {
          count?: number
          endpoint?: string
          id?: number
          user_id?: string
          window_start?: string
        }
        Relationships: []
      }
      rdm_commerces: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
          owner_user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          name: string
          owner_user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
          owner_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rdm_commerces_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "rdm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      rdm_payment_intents: {
        Row: {
          amount: number
          created_at: string
          currency: string
          external_id: string | null
          id: string
          provider: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          external_id?: string | null
          id?: string
          provider: string
          status: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          external_id?: string | null
          id?: string
          provider?: string
          status?: string
        }
        Relationships: []
      }
      rdm_places: {
        Row: {
          id: string
          lat: number
          lng: number
          name: string
          tags: string[]
          type: string
        }
        Insert: {
          id?: string
          lat: number
          lng: number
          name: string
          tags?: string[]
          type: string
        }
        Update: {
          id?: string
          lat?: number
          lng?: number
          name?: string
          tags?: string[]
          type?: string
        }
        Relationships: []
      }
      rdm_transactions: {
        Row: {
          amount: number
          created_at: string
          evidence_hash: string
          id: string
          metadata: Json
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          evidence_hash: string
          id?: string
          metadata?: Json
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          evidence_hash?: string
          id?: string
          metadata?: Json
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rdm_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rdm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      rdm_users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
      rdm_wallets: {
        Row: {
          balance: number
          currency: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          currency?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          currency?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rdm_wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "rdm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      room_members: {
        Row: {
          id: string
          joined_at: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_webhook_failures: {
        Row: {
          created_at: string
          error_message: string
          event_id: string | null
          event_type: string | null
          id: string
          payload: Json | null
          resolved: boolean
          retry_count: number
        }
        Insert: {
          created_at?: string
          error_message: string
          event_id?: string | null
          event_type?: string | null
          id?: string
          payload?: Json | null
          resolved?: boolean
          retry_count?: number
        }
        Update: {
          created_at?: string
          error_message?: string
          event_id?: string | null
          event_type?: string | null
          id?: string
          payload?: Json | null
          resolved?: boolean
          retry_count?: number
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          id: string
          message: string
          priority: string
          status: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          message: string
          priority?: string
          status?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          message?: string
          priority?: string
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tamv_federation_ring: {
        Row: {
          id: string
          last_heartbeat: string
          meta: Json | null
          node_name: string
          region: string | null
          status: string
        }
        Insert: {
          id?: string
          last_heartbeat?: string
          meta?: Json | null
          node_name: string
          region?: string | null
          status?: string
        }
        Update: {
          id?: string
          last_heartbeat?: string
          meta?: Json | null
          node_name?: string
          region?: string | null
          status?: string
        }
        Relationships: []
      }
      tamv_kernel_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          message: string | null
          payload: Json | null
          severity: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          message?: string | null
          payload?: Json | null
          severity?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          message?: string | null
          payload?: Json | null
          severity?: string | null
        }
        Relationships: []
      }
      tamvcrums_logs: {
        Row: {
          created_at: string
          ecg_rhythm: number | null
          emotional_state: Json | null
          event_type: string
          federation_id: string | null
          id: string
          payload: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          ecg_rhythm?: number | null
          emotional_state?: Json | null
          event_type: string
          federation_id?: string | null
          id?: string
          payload?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          ecg_rhythm?: number | null
          emotional_state?: Json | null
          event_type?: string
          federation_id?: string | null
          id?: string
          payload?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      tts_jobs: {
        Row: {
          audio_url: string | null
          created_at: string
          error_message: string | null
          id: string
          lesson_id: string | null
          status: string
          updated_at: string
          voice: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          lesson_id?: string | null
          status?: string
          updated_at?: string
          voice?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          lesson_id?: string | null
          status?: string
          updated_at?: string
          voice?: string | null
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string
          badge_id: string
          id: string
          tokens_awarded: number
          user_id: string
        }
        Insert: {
          awarded_at?: string
          badge_id: string
          id?: string
          tokens_awarded?: number
          user_id: string
        }
        Update: {
          awarded_at?: string
          badge_id?: string
          id?: string
          tokens_awarded?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed: boolean
          created_at: string | null
          id: string
          last_accessed_at: string | null
          lesson_id: string
          module_id: string
          progress: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id: string
          module_id: string
          progress?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id?: string
          module_id?: string
          progress?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      utamv_ai_logs: {
        Row: {
          academic_area: string | null
          academic_subarea: string | null
          bloom_level: string | null
          created_at: string
          foundation_confidence: number | null
          foundation_type: string | null
          id: string
          prompt: string
          request_type: string | null
          risk_flags: string[] | null
          user_id: string
        }
        Insert: {
          academic_area?: string | null
          academic_subarea?: string | null
          bloom_level?: string | null
          created_at?: string
          foundation_confidence?: number | null
          foundation_type?: string | null
          id?: string
          prompt: string
          request_type?: string | null
          risk_flags?: string[] | null
          user_id: string
        }
        Update: {
          academic_area?: string | null
          academic_subarea?: string | null
          bloom_level?: string | null
          created_at?: string
          foundation_confidence?: number | null
          foundation_type?: string | null
          id?: string
          prompt?: string
          request_type?: string | null
          risk_flags?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      admin_user_progress: {
        Row: {
          completed: boolean | null
          course_id: string | null
          course_title: string | null
          email: string | null
          full_name: string | null
          lesson_id: string | null
          lesson_title: string | null
          module_id: string | null
          module_title: string | null
          progress: number | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
      course_modules: {
        Row: {
          content: string | null
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string | null
          image_url: string | null
          is_free_preview: boolean | null
          order_index: number | null
          title: string | null
        }
        Insert: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          image_url?: string | null
          is_free_preview?: never
          order_index?: number | null
          title?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          image_url?: string | null
          is_free_preview?: never
          order_index?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "admin_user_progress"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard_view: {
        Row: {
          avatar_url: string | null
          badges_count: number | null
          display_name: string | null
          lessons_completed: number | null
          level: number | null
          tokens: number | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          badges_count?: never
          display_name?: never
          lessons_completed?: never
          level?: never
          tokens?: never
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          badges_count?: never
          display_name?: never
          lessons_completed?: never
          level?: never
          tokens?: never
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_rate_limit: {
        Args: { endpoint: string; max_requests: number; window_seconds: number }
        Returns: boolean
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      grant_badge: {
        Args: { _badge_code: string; _user_id: string }
        Returns: Json
      }
      has_course_access: {
        Args: { p_course_id: string; p_user_id: string }
        Returns: boolean
      }
      has_role:
        | {
            Args: {
              _role: Database["public"]["Enums"]["app_role"]
              _user_id: string
            }
            Returns: boolean
          }
        | { Args: { target_role: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "instructor" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "instructor", "student"],
    },
  },
} as const
