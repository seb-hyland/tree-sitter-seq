[
  (fasta_header_prefix)
  (fastq_header_prefix)
  (fastq_plus_prefix)
] @punctuation.delimiter

[
  (fasta_header_content)
  (fastq_header_content)
  (fastq_plus_content)
] @keyword

[
  (fasta_sequence_line)
  (fastq_sequence_line)
] @string

(fastq_quality_line) @constant.character

(eol) @text.ignored
