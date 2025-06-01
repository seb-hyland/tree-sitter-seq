(fasta_record
  (fasta_header
    (fasta_header_content) @name
  ) @item
)
(fastq_record
  (fastq_header
    (fastq_header_content) @name)
  (fastq_plus_line
    (fastq_plus_content)? @context)
) @item
