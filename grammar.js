/**
 * @file Tree-sitter grammar for biological sequence formats (FASTA, FASTQ)
 * @author Sebastian Hyland <st.hyland05@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "seq",

  // Don’t skip whitespace or newlines automatically—newlines are significant in FASTA/FASTQ
  extras: () => [],

  rules: {
    // A source file consists of zero or more records (FASTA or FASTQ)
    source_file: ($) => repeat($._record),

    // A “record” is either a FASTA record or a FASTQ record
    _record: ($) => choice($.fasta_record, $.fastq_record),

    //
    // FASTA
    //

    // A FASTA record consists of a header line, then one or more sequence lines
    fasta_record: ($) => seq($.fasta_header, repeat1($.fasta_sequence_line)),

    // A FASTA header: ‘>’, then any non-newline characters, then EOL
    fasta_header: ($) =>
      seq($.fasta_header_prefix, $.fasta_header_content, $.eol),
    fasta_header_prefix: ($) => token(">"),
    fasta_header_content: ($) => token(/[^\r\n]*/),

    // A FASTA sequence line: one or more ASCII letters (uppercase or lowercase), then EOL
    fasta_sequence_line: ($) => seq(token(/[A-Za-z]+/), $.eol),

    //
    // FASTQ
    //

    // A FASTQ record consists of a header line, a sequence line, a plus line, and a quality line
    fastq_record: ($) =>
      seq(
        $.fastq_header,
        $.fastq_sequence_line,
        $.fastq_plus_line,
        $.fastq_quality_line,
      ),

    // A FASTQ header: ‘@’, then any non-newline characters, then EOL
    fastq_header: ($) =>
      seq($.fastq_header_prefix, $.fastq_header_content, $.eol),
    fastq_header_prefix: ($) => token("@"),
    fastq_header_content: ($) => token(/[^\r\n]*/),

    // A FASTQ sequence line: one or more ASCII letters (uppercase or lowercase), then EOL
    fastq_sequence_line: ($) => seq(token(/[A-Za-z]+/), $.eol),

    // A FASTQ plus line: ‘+’, then any non-newline characters (optional), then EOL
    fastq_plus_line: ($) =>
      seq($.fastq_plus_prefix, optional($.fastq_plus_content), $.eol),
    fastq_plus_prefix: ($) => token("+"),
    fastq_plus_content: ($) => token(/[^\r\n]*/),

    // A FASTQ quality line: one or more ASCII characters in range 33–126, then EOL
    fastq_quality_line: ($) => seq(token(/[\x21-\x7E]+/), $.eol),

    //
    // Common
    //

    // EOL: either '\n' or '\r\n'
    eol: ($) => /\r?\n/,
  },
});
