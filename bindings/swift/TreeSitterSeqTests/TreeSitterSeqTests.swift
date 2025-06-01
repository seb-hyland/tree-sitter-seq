import XCTest
import SwiftTreeSitter
import TreeSitterSeq

final class TreeSitterSeqTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_seq())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Biological Sequence Grammar grammar")
    }
}
