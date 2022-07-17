using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace blogBackend.Models
{
    public partial class DBContext : DbContext
    {
        public DBContext()
        {
        }

        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BlogAdmin> BlogAdmins { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<SubscribedEmail> SubscribedEmails { get; set; } = null!;
        public virtual DbSet<UserComment> UserComments { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql(Environment.GetEnvironmentVariable("DB"), Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.22-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8_general_ci")
                .HasCharSet("utf8");

            modelBuilder.Entity<BlogAdmin>(entity =>
            {
                entity.HasKey(e => e.AdminUsername)
                    .HasName("PRIMARY");

                entity.ToTable("BLOG_ADMIN");

                entity.Property(e => e.AdminUsername).HasMaxLength(20);

                entity.Property(e => e.AdminPassword).HasMaxLength(20);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.NameOfCategory)
                    .HasName("PRIMARY");

                entity.ToTable("CATEGORY");

                entity.Property(e => e.NameOfCategory).HasMaxLength(20);
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("POST");

                entity.HasIndex(e => e.Category, "Category");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Category).HasMaxLength(20);

                entity.Property(e => e.Content).HasColumnType("text");

                entity.Property(e => e.CoverPhotoLink).HasMaxLength(2048);

                entity.Property(e => e.PostDate).HasColumnType("datetime");

                entity.Property(e => e.Title).HasMaxLength(255);

                entity.HasOne(d => d.CategoryNavigation)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.Category)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("POST_ibfk_1");
            });

            modelBuilder.Entity<SubscribedEmail>(entity =>
            {
                entity.HasKey(e => e.Email)
                    .HasName("PRIMARY");

                entity.ToTable("SUBSCRIBED_EMAIL");

                entity.Property(e => e.Email).HasMaxLength(60);

                entity.Property(e => e.SubscriptionDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<UserComment>(entity =>
            {
                entity.ToTable("USER_COMMENT");

                entity.HasIndex(e => e.ParentId, "ParentIDForeignKey");

                entity.HasIndex(e => e.PostId, "PostID");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CommentDate).HasColumnType("datetime");

                entity.Property(e => e.Content).HasMaxLength(280);

                entity.Property(e => e.Country).HasMaxLength(56);

                entity.Property(e => e.Email).HasMaxLength(60);

                entity.Property(e => e.Nick).HasMaxLength(30);

                entity.Property(e => e.ParentId).HasColumnName("ParentID");

                entity.Property(e => e.PostId).HasColumnName("PostID");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("ParentIDForeignKey");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.UserComments)
                    .HasForeignKey(d => d.PostId)
                    .HasConstraintName("USER_COMMENT_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
