package tree_sitter_seq_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_seq "github.com/seb-hyland/tree-sitter-seq/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_seq.Language())
	if language == nil {
		t.Errorf("Error loading Biological Sequence Grammar grammar")
	}
}
