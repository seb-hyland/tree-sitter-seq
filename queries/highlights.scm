[
  (fasta_header_prefix)
  (fastq_header_prefix)
  (fastq_plus_prefix)
] @punctuation.list_marker

(fasta_gap) @punctuation.delimeter

[
  (fasta_header_content)
  (fastq_header_content)
  (fastq_plus_content)
] @keyword

[
  (fasta_letters)
  (fastq_sequence_line)
] @string

(fastq_quality_line) @constant.character

(eol) @text.ignored
