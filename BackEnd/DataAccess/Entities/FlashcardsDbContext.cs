using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Entities;

public partial class FlashcardsDbContext : DbContext
{
    public FlashcardsDbContext(DbContextOptions<FlashcardsDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Flashcard> Flashcards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Flashcard>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FLASHCAR__3214EC2702CA630D");

            entity.ToTable("FLASHCARDS");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Answer)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("ANSWER");
            entity.Property(e => e.Question)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("QUESTION");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
