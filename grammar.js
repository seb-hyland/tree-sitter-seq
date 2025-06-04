/**
 * @file Tree-sitter grammar for biological sequence formats (FASTA, FASTQ)
 *         (allows “-” inside FASTA sequence lines, parsed as a distinct token)
 * @author…
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "seq",

  // Don’t skip whitespace or newlines automatically—newlines are significant in FASTA/FASTQ
  extras: () => [],

  rules: {
    //
    // A source file consists of zero or more records (FASTA‐style or FASTQ)
    //
    source_file: ($) => repeat($._record),

    _record: ($) => choice($.fasta_record, $.fastq_record),

    //
    // FASTA (now allows letters AND “-” on each sequence line)
    //
    //   >header⏎
    //   [one or more sequence lines], each of which may contain letters and/or “-”
    //
    fasta_record: ($) => seq($.fasta_header, repeat1($.fasta_sequence_line)),

    fasta_header: ($) =>
      seq($.fasta_header_prefix, $.fasta_header_content, $.eol),
    fasta_header_prefix: ($) => token(">"),
    fasta_header_content: ($) => token(/[^\r\n]*/),

    // Each FASTA sequence line is “one or more (letters OR gaps), then EOL”.
    // - “fasta_letters” groups [A-Za-z]+
    // - “fasta_gap” is exactly “-”
    //
    fasta_sequence_line: ($) =>
      seq(repeat1(choice($.fasta_letters, $.fasta_gap)), $.eol),

    fasta_letters: ($) => token(/[A-Za-z]+/),
    fasta_gap: ($) => token("-"),

    //
    // FASTQ (unchanged)
    //
    fastq_record: ($) =>
      seq(
        $.fastq_header,
        $.fastq_sequence_line,
        $.fastq_plus_line,
        $.fastq_quality_line,
      ),

    fastq_header: ($) =>
      seq($.fastq_header_prefix, $.fastq_header_content, $.eol),
    fastq_header_prefix: ($) => token("@"),
    fastq_header_content: ($) => token(/[^\r\n]*/),

    fastq_sequence_line: ($) => seq(token(/[A-Za-z]+/), $.eol),

    fastq_plus_line: ($) =>
      seq($.fastq_plus_prefix, optional($.fastq_plus_content), $.eol),
    fastq_plus_prefix: ($) => token("+"),
    fastq_plus_content: ($) => token(/[^\r\n]*/),

    fastq_quality_line: ($) => seq(token(/[\x21-\x7E]+/), $.eol),

    //
    // Common: end‐of‐line
    //
    eol: ($) => /\r?\n/,
  },
});
